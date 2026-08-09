const rateLimit = require('express-rate-limit');

/**
 * Authentication Rate Limiter
 * Prevents brute force attacks on login/register
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: 'Too many authentication attempts, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => {
        // Skip rate limiting for GET requests
        return req.method === 'GET';
    },
    handler: (req, res) => {
        res.status(429).json({
            msg: 'Too many attempts, please try again later',
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: req.rateLimit.resetTime
        });
    }
});

/**
 * API General Rate Limiter
 * Prevents abuse of API endpoints
 */
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    message: 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            msg: 'Too many requests, please try again later',
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: req.rateLimit.resetTime
        });
    }
});

/**
 * Strict API Rate Limiter
 * For sensitive operations (password reset, email changes, etc.)
 */
const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 attempts per hour
    message: 'Too many attempts for this operation, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            msg: 'Too many attempts for this operation',
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: req.rateLimit.resetTime
        });
    }
});

/**
 * WebSocket Rate Limiter
 * Prevents message spam in chat
 */
const socketMessageLimiter = (maxMessages = 10, windowMs = 10 * 1000) => {
    const userMessageCounts = {};
    
    return (username) => {
        if (!userMessageCounts[username]) {
            userMessageCounts[username] = { count: 0, resetTime: Date.now() + windowMs };
        }
        
        const userCount = userMessageCounts[username];
        
        // Reset if window expired
        if (Date.now() > userCount.resetTime) {
            userCount.count = 0;
            userCount.resetTime = Date.now() + windowMs;
        }
        
        userCount.count++;
        
        // Return true if limit exceeded
        return userCount.count > maxMessages;
    };
};

module.exports = {
    authLimiter,
    apiLimiter,
    strictLimiter,
    socketMessageLimiter
};
