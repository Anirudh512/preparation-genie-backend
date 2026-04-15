const mongoose = require('mongoose');

const contentManifestSchema = new mongoose.Schema(
  {
    patchId: { type: String, default: '' },
    message: { type: String, default: '' },
    cacheActions: [{ type: String }],
    restartRoute: { type: String, default: '/splash' },
  },
  { _id: false }
);

const releaseSchema = new mongoose.Schema(
  {
    releaseLine: { type: String, required: true, trim: true, default: '2.0' },
    major: { type: Number, required: true },
    minor: { type: Number, required: true },
    patch: { type: Number, required: true },
    displayVersion: { type: String, required: true, trim: true },
    versionCode: { type: Number, required: true },
    binaryVersionCode: { type: Number, required: true },
    binaryVersionName: { type: String, required: true, trim: true },
    releaseKind: {
      type: String,
      enum: ['contentPatch', 'apkRelease'],
      required: true,
    },
    mandatory: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['draft', 'live', 'archived'],
      default: 'draft',
    },
    releaseNotes: { type: String, default: '' },
    minSupportedVersionCode: { type: Number, default: 0 },
    apkObjectKey: { type: String, default: '' },
    artifactProvider: {
      type: String,
      enum: ['none', 'local', 'r2'],
      default: 'none',
    },
    downloadPageSlug: { type: String, required: true, trim: true },
    contentManifestUrl: { type: String, default: '' },
    contentManifest: { type: contentManifestSchema, default: null },
    sha256: { type: String, default: '' },
    sizeBytes: { type: Number, default: 0 },
    publishedAt: { type: Date, default: null },
    createdBy: { type: String, default: 'ADMIN_1' },
    lastActivatedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

releaseSchema.index({ status: 1, publishedAt: -1 });
releaseSchema.index({ releaseLine: 1, patch: -1 });
releaseSchema.index({ downloadPageSlug: 1 }, { unique: true });

module.exports = mongoose.model('Release', releaseSchema);
