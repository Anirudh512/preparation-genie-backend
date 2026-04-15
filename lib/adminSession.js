const crypto = require('crypto');

const COOKIE_NAME = 'pg_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'ADMIN_1',
    pin: process.env.ADMIN_PIN || '7569527481',
  };
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'change-this-admin-session-secret';
}

function parseCookies(req) {
  const cookieHeader = req.headers.cookie || '';
  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const index = part.indexOf('=');
      if (index === -1) return acc;
      const key = part.slice(0, index).trim();
      const value = decodeURIComponent(part.slice(index + 1));
      acc[key] = value;
      return acc;
    }, {});
}

function signValue(value) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('hex');
}

function encodePayload(payload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function decodePayload(encoded) {
  return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
}

function createAdminSession(username) {
  const payload = {
    username,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encoded = encodePayload(payload);
  return `${encoded}.${signValue(encoded)}`;
}

function verifyAdminSession(token) {
  if (!token || !token.includes('.')) return null;
  const [encoded, signature] = token.split('.', 2);
  if (!encoded || !signature) return null;
  const expectedSignature = signValue(encoded);
  const matches = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
  if (!matches) return null;
  try {
    const payload = decodePayload(encoded);
    if (!payload || payload.exp < Date.now()) return null;
    return payload;
  } catch (_) {
    return null;
  }
}

function setAdminSessionCookie(res, token) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${Math.floor(
      SESSION_TTL_MS / 1000
    )}${secureFlag}`
  );
}

function clearAdminSessionCookie(res) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secureFlag}`
  );
}

function getAdminSession(req) {
  const cookies = parseCookies(req);
  return verifyAdminSession(cookies[COOKIE_NAME]);
}

function requireAdminSession(req, res, next) {
  const session = getAdminSession(req);
  if (!session) {
    return res.status(401).json({ msg: 'Admin session required' });
  }
  req.adminSession = session;
  return next();
}

module.exports = {
  COOKIE_NAME,
  getAdminCredentials,
  createAdminSession,
  verifyAdminSession,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  getAdminSession,
  requireAdminSession,
};
