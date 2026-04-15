const crypto = require('crypto');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { Readable } = require('stream');

function hasR2Config() {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME
  );
}

function sha256Hex(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function hmac(key, value, encoding) {
  return crypto.createHmac('sha256', key).update(value).digest(encoding);
}

function getSigningKey(secretKey, dateStamp, region = 'auto', service = 's3') {
  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
}

function formatAmzDate(date = new Date()) {
  const iso = date.toISOString().replace(/[:-]|\.\d{3}/g, '');
  return {
    amzDate: iso,
    dateStamp: iso.slice(0, 8),
  };
}

function getR2Endpoint(objectKey) {
  const host = `${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const safeKey = String(objectKey || '').replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/');
  const resourcePath = `/${process.env.R2_BUCKET_NAME}/${safeKey}`;
  return {
    host,
    resourcePath,
    url: `https://${host}${resourcePath}`,
  };
}

async function signedR2Fetch(method, objectKey, buffer = Buffer.alloc(0), contentType = 'application/octet-stream') {
  const { host, resourcePath, url } = getR2Endpoint(objectKey);
  const { amzDate, dateStamp } = formatAmzDate();
  const payloadHash = sha256Hex(buffer);
  const canonicalHeaders = [
    `content-type:${contentType}`,
    `host:${host}`,
    `x-amz-content-sha256:${payloadHash}`,
    `x-amz-date:${amzDate}`,
  ].join('\n') + '\n';
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';
  const canonicalRequest = [
    method,
    resourcePath,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n');
  const signingKey = getSigningKey(process.env.R2_SECRET_ACCESS_KEY, dateStamp);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  const authorization = `AWS4-HMAC-SHA256 Credential=${process.env.R2_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return fetch(url, {
    method,
    headers: {
      'content-type': contentType,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': amzDate,
      Authorization: authorization,
    },
    body: method === 'PUT' ? buffer : undefined,
  });
}

async function uploadReleaseArtifact({ buffer, objectKey, contentType = 'application/vnd.android.package-archive' }) {
  const safeKey = String(objectKey || '').replace(/\\/g, '/');
  const sha256 = sha256Hex(buffer);
  const sizeBytes = buffer.length;

  if (hasR2Config()) {
    const response = await signedR2Fetch('PUT', safeKey, buffer, contentType);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`R2 upload failed (${response.status}): ${text.slice(0, 240)}`);
    }

    return {
      artifactProvider: 'r2',
      apkObjectKey: safeKey,
      sha256,
      sizeBytes,
    };
  }

  const localPath = path.join(process.cwd(), 'uploads', 'releases', ...safeKey.split('/'));
  await fsp.mkdir(path.dirname(localPath), { recursive: true });
  await fsp.writeFile(localPath, buffer);

  return {
    artifactProvider: 'local',
    apkObjectKey: safeKey,
    sha256,
    sizeBytes,
  };
}

async function sendStoredArtifact(release, res) {
  if (!release || !release.apkObjectKey) {
    res.status(404).send('APK not available');
    return;
  }

  const filename = `preparation-genie-${release.displayVersion}.apk`;
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  if (release.artifactProvider === 'r2') {
    const response = await signedR2Fetch('GET', release.apkObjectKey, Buffer.alloc(0), 'application/octet-stream');
    if (!response.ok || !response.body) {
      const text = await response.text();
      res.status(502).send(`Failed to fetch APK from storage. ${text.slice(0, 200)}`);
      return;
    }

    const bodyStream = Readable.fromWeb(response.body);
    bodyStream.pipe(res);
    return;
  }

  const localPath = path.join(process.cwd(), 'uploads', 'releases', ...String(release.apkObjectKey).split('/'));
  if (!fs.existsSync(localPath)) {
    res.status(404).send('APK file not found');
    return;
  }
  res.sendFile(localPath);
}

module.exports = {
  hasR2Config,
  uploadReleaseArtifact,
  sendStoredArtifact,
};
