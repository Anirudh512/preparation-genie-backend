const cors = require('cors');

/**
 * CORS Configuration
 * Restricts which origins can access the API
 */
const corsOptions = {
    // Allow requests from specified origins
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',      // Local dev
            'http://localhost:8080',      // Alternative local
            'http://127.0.0.1:3000',      // Localhost IP
            process.env.FRONTEND_URL || '' // Frontend URL from env
        ];

        // Allow requests with no origin (mobile apps, Postman, curl, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },

    // Allow credentials (cookies, authorization headers)
    credentials: true,

    // Allowed HTTP methods
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

    // Allowed headers
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],

    // Exposed headers (client can access these)
    exposedHeaders: ['X-Total-Count', 'X-Page-Count', 'RateLimit-Limit', 'RateLimit-Remaining'],

    // Cache preflight for 24 hours
    maxAge: 86400
};

/**
 * Development CORS (Permissive - only for local development)
 * WARNING: Never use in production!
 */
const devCorsOptions = {
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
};

/**
 * Get appropriate CORS config based on environment
 */
const getCorsConfig = () => {
    if (process.env.NODE_ENV === 'production') {
        return corsOptions; // Restrictive in production
    }
    return devCorsOptions; // Permissive in development
};

module.exports = {
    corsOptions,
    devCorsOptions,
    getCorsConfig
};
