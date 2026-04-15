const crypto = require('crypto');
const express = require('express');
const path = require('path');
const Release = require('../models/Release');
const {
  getAdminCredentials,
  createAdminSession,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  getAdminSession,
  requireAdminSession,
} = require('../lib/adminSession');
const {
  DEFAULT_RELEASE_LINE,
  buildDraftPayload,
  getCurrentLiveRelease,
  getLatestPublishedApkRelease,
  toReleaseResponse,
  buildLegacyAppVersionPayload,
} = require('../lib/releaseService');
const { uploadReleaseArtifact } = require('../lib/storageProvider');

const router = express.Router();

router.get('/auth/me', (req, res) => {
  const session = getAdminSession(req);
  if (!session) {
    return res.status(401).json({ msg: 'No active admin session' });
  }
  return res.json({ username: session.username });
});

router.post('/auth/login', (req, res) => {
  const { username, pin } = req.body || {};
  const creds = getAdminCredentials();
  if (username !== creds.username || pin !== creds.pin) {
    return res.status(401).json({ msg: 'Invalid admin credentials' });
  }

  const token = createAdminSession(username);
  setAdminSessionCookie(res, token);
  return res.json({ msg: 'Admin login successful', username });
});

router.post('/auth/logout', (req, res) => {
  clearAdminSessionCookie(res);
  return res.json({ msg: 'Logged out' });
});

router.get('/releases', requireAdminSession, async (req, res) => {
  try {
    const releases = await Release.find({}).sort({ createdAt: -1, publishedAt: -1, updatedAt: -1 });
    const currentLive = await getCurrentLiveRelease();
    const latestBinaryRelease = await getLatestPublishedApkRelease();

    return res.json({
      admin: req.adminSession,
      defaultReleaseLine: DEFAULT_RELEASE_LINE,
      currentLive: toReleaseResponse(currentLive, req),
      latestBinaryRelease: toReleaseResponse(latestBinaryRelease, req),
      releases: releases.map((item) => toReleaseResponse(item, req)),
    });
  } catch (err) {
    console.error('Admin releases list error:', err);
    return res.status(500).json({ msg: 'Failed to load releases' });
  }
});

router.post('/releases/draft', requireAdminSession, async (req, res) => {
  try {
    const draftPayload = await buildDraftPayload({
      releaseLine: req.body?.releaseLine,
      releaseKind: req.body?.releaseKind,
      mandatory: req.body?.mandatory,
      releaseNotes: req.body?.releaseNotes,
      contentManifest: req.body?.contentManifest,
      createdBy: req.adminSession.username,
    });

    const release = await Release.create(draftPayload);
    return res.status(201).json({
      msg: 'Draft created',
      release: toReleaseResponse(release, req),
    });
  } catch (err) {
    console.error('Create draft error:', err);
    return res.status(400).json({ msg: err.message || 'Could not create draft' });
  }
});

router.post(
  '/releases/:id/upload-apk',
  requireAdminSession,
  express.raw({
    type: ['application/vnd.android.package-archive', 'application/octet-stream'],
    limit: '200mb',
  }),
  async (req, res) => {
    try {
      const release = await Release.findById(req.params.id);
      if (!release) {
        return res.status(404).json({ msg: 'Release draft not found' });
      }
      if (release.releaseKind !== 'apkRelease') {
        return res.status(400).json({ msg: 'APK upload is only allowed for APK releases' });
      }
      if (release.status !== 'draft') {
        return res.status(400).json({ msg: 'Only draft releases can accept uploads' });
      }
      if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
        return res.status(400).json({ msg: 'No APK file data received' });
      }

      const objectKey = `${release.releaseLine.replace(/\./g, '-')}/${release.downloadPageSlug}.apk`;
      const upload = await uploadReleaseArtifact({
        buffer: req.body,
        objectKey,
      });

      release.apkObjectKey = upload.apkObjectKey;
      release.artifactProvider = upload.artifactProvider;
      release.sha256 = upload.sha256;
      release.sizeBytes = upload.sizeBytes;
      await release.save();

      return res.json({
        msg: 'APK uploaded successfully',
        release: toReleaseResponse(release, req),
      });
    } catch (err) {
      console.error('Upload APK error:', err);
      return res.status(500).json({ msg: err.message || 'Failed to upload APK' });
    }
  }
);

router.post('/releases/:id/publish', requireAdminSession, async (req, res) => {
  try {
    const release = await Release.findById(req.params.id);
    if (!release) {
      return res.status(404).json({ msg: 'Release not found' });
    }
    if (release.status !== 'draft') {
      return res.status(400).json({ msg: 'Only draft releases can be published' });
    }
    if (release.releaseKind === 'apkRelease' && (!release.apkObjectKey || !release.sha256 || !release.sizeBytes)) {
      return res.status(400).json({ msg: 'Upload the APK before publishing this release' });
    }
    if (release.releaseKind === 'contentPatch' && !release.contentManifest) {
      return res.status(400).json({ msg: 'A valid content manifest is required for content patches' });
    }

    if (release.releaseKind === 'contentPatch') {
      const manifestJson = JSON.stringify(release.contentManifest);
      release.sha256 = crypto.createHash('sha256').update(manifestJson).digest('hex');
      release.sizeBytes = Buffer.byteLength(manifestJson, 'utf8');
    }

    await Release.updateMany({ status: 'live' }, { $set: { status: 'archived' } });
    release.status = 'live';
    if (!release.publishedAt) {
      release.publishedAt = new Date();
    }
    release.lastActivatedAt = new Date();
    await release.save();

    return res.json({
      msg: 'Release published successfully',
      release: toReleaseResponse(release, req),
    });
  } catch (err) {
    console.error('Publish release error:', err);
    return res.status(500).json({ msg: err.message || 'Could not publish release' });
  }
});

router.post('/releases/:id/rollback', requireAdminSession, async (req, res) => {
  try {
    const release = await Release.findById(req.params.id);
    if (!release) {
      return res.status(404).json({ msg: 'Release not found' });
    }
    if (!release.publishedAt) {
      return res.status(400).json({ msg: 'Only published releases can be rolled back' });
    }

    await Release.updateMany({ status: 'live' }, { $set: { status: 'archived' } });
    release.status = 'live';
    release.lastActivatedAt = new Date();
    await release.save();

    return res.json({
      msg: 'Rollback activated successfully',
      release: toReleaseResponse(release, req),
    });
  } catch (err) {
    console.error('Rollback release error:', err);
    return res.status(500).json({ msg: err.message || 'Could not roll back release' });
  }
});

router.get('/app-version', async (req, res) => {
  const payload = await buildLegacyAppVersionPayload(req);
  if (!payload) {
    return res.status(404).json({ msg: 'No APK release found' });
  }
  return res.json(payload);
});

router.get('/app-version/latest', async (req, res) => {
  const payload = await buildLegacyAppVersionPayload(req);
  if (!payload) {
    return res.status(404).json({ msg: 'No APK release found' });
  }
  return res.json(payload);
});

router.get('/release-center/login', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views', 'release-center-login.html'));
});

router.get('/release-center', requireAdminSession, (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views', 'release-center-dashboard.html'));
});

module.exports = router;

