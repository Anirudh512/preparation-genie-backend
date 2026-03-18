const mongoose = require('mongoose');

const appVersionSchema = new mongoose.Schema({
    versionCode: { type: Number, required: true },
    versionName: { type: String, required: true },
    apkUrl: { type: String, required: true },
    releaseNotes: { type: String },
    isMandatory: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AppVersion', appVersionSchema);
