const crypto = require('crypto');
const Release = require('../models/Release');

const DEFAULT_RELEASE_LINE = '2.0';
const DEFAULT_CONTENT_ACTIONS = ['offlineCache', 'profileCache', 'leaderboardCache', 'syllabusCache'];

function parseReleaseLine(input = DEFAULT_RELEASE_LINE) {
  const line = String(input || DEFAULT_RELEASE_LINE).trim();
  const match = /^(\d+)\.(\d+)$/.exec(line);
  if (!match) {
    throw new Error('Release line must look like 2.0 or 3.1');
  }
  return {
    releaseLine: line,
    major: Number(match[1]),
    minor: Number(match[2]),
  };
}

function computeVersionCode(major, minor, patch) {
  return major * 1000 + minor * 100 + patch;
}

function buildDisplayVersion(major, minor, patch) {
  return `${major}.${minor}.${patch}`;
}

function buildOrigin(req) {
  const forwardedProto = req.headers['x-forwarded-proto'];
  const protocol = forwardedProto ? String(forwardedProto).split(',')[0].trim() : req.protocol || 'https';
  return `${protocol}://${req.get('host')}`;
}

function absoluteUrl(req, value) {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  const origin = buildOrigin(req);
  return `${origin}${value.startsWith('/') ? '' : '/'}${value}`;
}

async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await Release.exists({ downloadPageSlug: slug })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
  return slug;
}

async function getCurrentLiveRelease() {
  return Release.findOne({ status: 'live' }).sort({ lastActivatedAt: -1, publishedAt: -1, updatedAt: -1 });
}

async function getLatestPublishedApkRelease(releaseLine = null) {
  const query = {
    releaseKind: 'apkRelease',
    publishedAt: { $ne: null },
  };
  if (releaseLine) {
    query.releaseLine = releaseLine;
  }
  return Release.findOne(query).sort({ lastActivatedAt: -1, publishedAt: -1, createdAt: -1 });
}

async function getNextPatchNumber(releaseLine) {
  const latestForLine = await Release.findOne({ releaseLine }).sort({ patch: -1, createdAt: -1 });
  if (!latestForLine) return 0;
  return Number(latestForLine.patch || 0) + 1;
}

function normalizeContentManifest(input, patchId) {
  let manifest = input;
  if (typeof manifest === 'string') {
    try {
      manifest = JSON.parse(manifest);
    } catch (_) {
      throw new Error('Content manifest must be valid JSON');
    }
  }

  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error('Content manifest must be a JSON object');
  }

  const cacheActions = Array.from(
    new Set(
      (Array.isArray(manifest.cacheActions) ? manifest.cacheActions : DEFAULT_CONTENT_ACTIONS)
        .map((value) => String(value || '').trim())
        .filter(Boolean)
    )
  );

  const message = String(manifest.message || 'Refresh app content and cached data.').trim();
  const restartRoute = String(manifest.restartRoute || '/splash').trim() || '/splash';

  if (cacheActions.length === 0 && !message) {
    throw new Error('Content manifest must include a message or cache actions');
  }

  return {
    patchId,
    message,
    cacheActions,
    restartRoute,
  };
}

async function buildDraftPayload({
  releaseLine = DEFAULT_RELEASE_LINE,
  releaseKind = 'apkRelease',
  mandatory = false,
  releaseNotes = '',
  contentManifest = null,
  createdBy = 'ADMIN_1',
}) {
  const parsedLine = parseReleaseLine(releaseLine);
  const patch = await getNextPatchNumber(parsedLine.releaseLine);
  const displayVersion = buildDisplayVersion(parsedLine.major, parsedLine.minor, patch);
  const versionCode = computeVersionCode(parsedLine.major, parsedLine.minor, patch);
  const baseSlug = `v-${parsedLine.major}-${parsedLine.minor}-${patch}`;
  const downloadPageSlug = await ensureUniqueSlug(baseSlug);

  let binaryVersionCode = versionCode;
  let binaryVersionName = displayVersion;
  let minSupportedVersionCode = versionCode;
  let normalizedManifest = null;

  if (releaseKind === 'contentPatch') {
    const latestBinary = await getLatestPublishedApkRelease(parsedLine.releaseLine);
    if (!latestBinary) {
      throw new Error('Publish an APK release for this release line before creating a content patch.');
    }
    binaryVersionCode = latestBinary.versionCode;
    binaryVersionName = latestBinary.displayVersion;
    minSupportedVersionCode = latestBinary.versionCode;
    normalizedManifest = normalizeContentManifest(contentManifest, downloadPageSlug);
  }

  return {
    releaseLine: parsedLine.releaseLine,
    major: parsedLine.major,
    minor: parsedLine.minor,
    patch,
    displayVersion,
    versionCode,
    binaryVersionCode,
    binaryVersionName,
    releaseKind,
    mandatory: Boolean(mandatory),
    status: 'draft',
    releaseNotes: String(releaseNotes || '').trim(),
    minSupportedVersionCode,
    apkObjectKey: '',
    artifactProvider: 'none',
    downloadPageSlug,
    contentManifestUrl: releaseKind === 'contentPatch' ? `/api/releases/content/${downloadPageSlug}` : '',
    contentManifest: normalizedManifest,
    sha256: '',
    sizeBytes: 0,
    createdBy,
  };
}

function toReleaseResponse(release, req) {
  const item = release && typeof release.toObject === 'function' ? release.toObject() : release;
  if (!item) return null;

  const downloadPageUrl = absoluteUrl(req, `/download/${item.downloadPageSlug}`);
  const downloadFileUrl = item.apkObjectKey ? absoluteUrl(req, `/download/file/${item.downloadPageSlug}`) : '';
  const contentManifestUrl = item.releaseKind === 'contentPatch'
    ? absoluteUrl(req, item.contentManifestUrl || `/api/releases/content/${item.downloadPageSlug}`)
    : '';

  return {
    id: String(item._id),
    releaseLine: item.releaseLine,
    major: item.major,
    minor: item.minor,
    patch: item.patch,
    displayVersion: item.displayVersion,
    versionCode: item.versionCode,
    binaryVersionCode: item.binaryVersionCode,
    binaryVersionName: item.binaryVersionName,
    releaseKind: item.releaseKind,
    mandatory: item.mandatory,
    status: item.status,
    releaseNotes: item.releaseNotes || '',
    minSupportedVersionCode: item.minSupportedVersionCode || 0,
    apkObjectKey: item.apkObjectKey || '',
    apkPublicUrl: downloadFileUrl,
    downloadPageSlug: item.downloadPageSlug,
    downloadPageUrl,
    contentManifestUrl,
    contentManifest: item.contentManifest || null,
    sha256: item.sha256 || '',
    sizeBytes: item.sizeBytes || 0,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    createdBy: item.createdBy || 'ADMIN_1',
    lastActivatedAt: item.lastActivatedAt || null,
    buildCommand: item.releaseKind === 'apkRelease'
      ? `flutter build apk --no-pub --build-name ${item.displayVersion} --build-number ${item.versionCode}`
      : null,
  };
}

async function buildLegacyAppVersionPayload(req) {
  const latestApk = await getLatestPublishedApkRelease();
  if (!latestApk) return null;
  const currentLive = await getCurrentLiveRelease();
  const response = toReleaseResponse(latestApk, req);
  return {
    versionCode: latestApk.versionCode,
    versionName: latestApk.displayVersion,
    apkUrl: response.apkPublicUrl,
    releaseNotes: latestApk.releaseNotes || '',
    isMandatory: currentLive && String(currentLive._id) === String(latestApk._id) ? Boolean(latestApk.mandatory) : false,
    updatedAt: latestApk.publishedAt || latestApk.updatedAt,
  };
}

function humanFileSize(sizeBytes) {
  const bytes = Number(sizeBytes || 0);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

module.exports = {
  DEFAULT_RELEASE_LINE,
  parseReleaseLine,
  computeVersionCode,
  buildDisplayVersion,
  buildOrigin,
  absoluteUrl,
  normalizeContentManifest,
  buildDraftPayload,
  getCurrentLiveRelease,
  getLatestPublishedApkRelease,
  getNextPatchNumber,
  toReleaseResponse,
  buildLegacyAppVersionPayload,
  humanFileSize,
};
