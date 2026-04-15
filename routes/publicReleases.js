const express = require('express');
const Release = require('../models/Release');
const {
  buildOrigin,
  buildLegacyAppVersionPayload,
  getCurrentLiveRelease,
  getLatestPublishedApkRelease,
  humanFileSize,
  toReleaseResponse,
} = require('../lib/releaseService');
const { sendStoredArtifact } = require('../lib/storageProvider');

const router = express.Router();

function escapeHtml(input) {
  return String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderDownloadPage({ release, latestBinary, req }) {
  const releaseData = toReleaseResponse(release, req);
  const latestBinaryData = latestBinary ? toReleaseResponse(latestBinary, req) : null;
  const installButton = release.releaseKind === 'apkRelease' && releaseData.apkPublicUrl
    ? `<a class="download-btn" href="${escapeHtml(releaseData.apkPublicUrl)}">Download APK</a>`
    : '';
  const contentPatchNote = release.releaseKind === 'contentPatch'
    ? `
      <div class="note-card">
        <h3>No APK download is needed</h3>
        <p>This release is a content patch. Open Preparation Genie on your phone and it will apply inside the app.</p>
        ${latestBinaryData ? `<p>If your app is too old, install the latest binary first.</p><a class="secondary-btn" href="${escapeHtml(latestBinaryData.apkPublicUrl)}">Download latest app build</a>` : ''}
      </div>
    `
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Preparation Genie Download</title>
  <style>
    :root {
      --bg: #eef8f6;
      --surface: #ffffff;
      --ink: #12322f;
      --muted: #55716d;
      --brand: #0f766e;
      --accent: #f59e0b;
      --line: #cde7e2;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      color: var(--ink);
      background:
        radial-gradient(circle at top right, rgba(245,158,11,0.18), transparent 30%),
        linear-gradient(180deg, #f4fbfa 0%, var(--bg) 100%);
      min-height: 100vh;
    }
    .wrap {
      max-width: 860px;
      margin: 0 auto;
      padding: 32px 20px 48px;
    }
    .hero {
      background: linear-gradient(135deg, #0f766e, #164e63);
      color: white;
      border-radius: 28px;
      padding: 28px;
      box-shadow: 0 24px 50px rgba(15,118,110,0.22);
    }
    .hero small { opacity: 0.86; letter-spacing: 0.08em; }
    .hero h1 { margin: 10px 0 8px; font-size: 36px; }
    .hero p { margin: 0; max-width: 560px; line-height: 1.55; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 18px;
      margin-top: 20px;
    }
    .card, .note-card {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 22px;
      padding: 22px;
      box-shadow: 0 14px 34px rgba(18,50,47,0.08);
    }
    .meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
    .chip {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.22);
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 13px;
    }
    h2, h3 { margin: 0 0 10px; }
    ul { margin: 0; padding-left: 18px; line-height: 1.6; }
    .download-btn, .secondary-btn {
      display: inline-block;
      text-decoration: none;
      border-radius: 999px;
      padding: 14px 22px;
      font-weight: 700;
      margin-top: 16px;
    }
    .download-btn {
      background: linear-gradient(135deg, #f59e0b, #facc15);
      color: #2f1f04;
    }
    .secondary-btn {
      background: #ecfeff;
      color: #0f766e;
      border: 1px solid #a7f3d0;
    }
    .muted { color: var(--muted); }
    .footer-note {
      margin-top: 24px;
      color: var(--muted);
      font-size: 14px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <small>PREPARATION GENIE RELEASE CENTER</small>
      <h1>${escapeHtml(releaseData.displayVersion)}</h1>
      <p>${escapeHtml(releaseData.releaseNotes || 'Latest update for Preparation Genie students.')}</p>
      <div class="meta">
        <span class="chip">Release kind: ${escapeHtml(releaseData.releaseKind)}</span>
        <span class="chip">Posted: ${escapeHtml(releaseData.publishedAt ? new Date(releaseData.publishedAt).toLocaleString() : 'Draft')}</span>
        <span class="chip">Binary build: ${escapeHtml(releaseData.binaryVersionName)} (${escapeHtml(releaseData.binaryVersionCode)})</span>
      </div>
    </section>

    <div class="grid">
      <section class="card">
        <h2>Install details</h2>
        <p class="muted">Use Chrome on Android for the smoothest install flow.</p>
        <ul>
          <li>Release version: ${escapeHtml(releaseData.displayVersion)}</li>
          <li>Android version code: ${escapeHtml(releaseData.versionCode)}</li>
          <li>Download size: ${escapeHtml(humanFileSize(releaseData.sizeBytes))}</li>
          <li>Mandatory update: ${releaseData.mandatory ? 'Yes' : 'No'}</li>
        </ul>
        ${installButton}
      </section>

      <section class="card">
        <h2>What changed</h2>
        <p class="muted">Users only see the update prompt when their app is behind the live release requirements.</p>
        <ul>
          ${(releaseData.releaseNotes || 'Improvements and release refinements.').split('\n').filter(Boolean).map((line) => `<li>${escapeHtml(line.replace(/^-\s*/, ''))}</li>`).join('')}
        </ul>
      </section>
    </div>

    ${contentPatchNote}

    <p class="footer-note">
      If the APK does not install immediately, allow Chrome or your browser to install unknown apps, then tap the download button again.
    </p>
  </div>
</body>
</html>`;
}

router.get('/api/releases/current', async (req, res) => {
  try {
    const currentRelease = await getCurrentLiveRelease();
    const latestApkRelease = await getLatestPublishedApkRelease();
    if (!currentRelease && !latestApkRelease) {
      return res.status(404).json({ msg: 'No releases found' });
    }

    return res.json({
      currentRelease: toReleaseResponse(currentRelease || latestApkRelease, req),
      latestApkRelease: toReleaseResponse(latestApkRelease, req),
      legacyAppVersion: await buildLegacyAppVersionPayload(req),
      generatedAt: new Date().toISOString(),
      backendOrigin: buildOrigin(req),
    });
  } catch (err) {
    console.error('Current release error:', err);
    return res.status(500).json({ msg: 'Failed to load current release' });
  }
});

router.get('/api/releases/history', async (req, res) => {
  try {
    const releases = await Release.find({ publishedAt: { $ne: null } }).sort({ publishedAt: -1, createdAt: -1 });
    return res.json({
      items: releases.map((item) => toReleaseResponse(item, req)),
    });
  } catch (err) {
    console.error('Release history error:', err);
    return res.status(500).json({ msg: 'Failed to load release history' });
  }
});

router.get('/api/releases/content/:slug', async (req, res) => {
  try {
    const release = await Release.findOne({ downloadPageSlug: req.params.slug, releaseKind: 'contentPatch' });
    if (!release || !release.contentManifest) {
      return res.status(404).json({ msg: 'Content patch not found' });
    }

    return res.json({
      releaseId: String(release._id),
      displayVersion: release.displayVersion,
      binaryVersionCode: release.binaryVersionCode,
      sha256: release.sha256,
      manifest: release.contentManifest,
    });
  } catch (err) {
    console.error('Content manifest error:', err);
    return res.status(500).json({ msg: 'Failed to load content patch manifest' });
  }
});

router.get('/download/latest', async (req, res) => {
  try {
    const currentRelease = await getCurrentLiveRelease();
    const fallback = currentRelease || (await getLatestPublishedApkRelease());
    if (!fallback) {
      return res.status(404).send('No releases available yet.');
    }
    return res.redirect(`/download/${fallback.downloadPageSlug}`);
  } catch (err) {
    console.error('Download latest error:', err);
    return res.status(500).send('Could not resolve the latest download.');
  }
});

router.get('/download/file/:slug', async (req, res) => {
  try {
    const release = await Release.findOne({ downloadPageSlug: req.params.slug, releaseKind: 'apkRelease' });
    if (!release) {
      return res.status(404).send('APK release not found');
    }
    await sendStoredArtifact(release, res);
  } catch (err) {
    console.error('Download file error:', err);
    res.status(500).send('Could not download APK');
  }
});

router.get('/download/:slug', async (req, res) => {
  try {
    const release = await Release.findOne({ downloadPageSlug: req.params.slug });
    if (!release) {
      return res.status(404).send('Release page not found');
    }
    const latestBinary = await getLatestPublishedApkRelease(release.releaseLine);
    return res.send(renderDownloadPage({ release, latestBinary, req }));
  } catch (err) {
    console.error('Download page error:', err);
    return res.status(500).send('Could not load release page');
  }
});

module.exports = router;
