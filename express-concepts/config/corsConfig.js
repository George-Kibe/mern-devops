const cors = require('cors');

// CORS configuration
const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'https://yourdomain.com']; 
        // frontend origins allowed to access the API
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // giving permission to the origin
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Version'],
    exposedHeaders: ['Content-Length', 'X-Request-ID'],
    maxAge: 600, // Cache preflight response for 10 mins to avoid repeated preflight requests
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true, // support for cookies and HTTP authentication
    optionsSuccessStatus: 204, // no content response for preflight requests
  });
};

module.exports = { configureCors };