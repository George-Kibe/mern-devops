const express = require('express');
const PORT = process.env.PORT || 3000;
const { configureCors } = require('./config/corsConfig');
const { requestLogger, addTimestamp, detectClientArchitecture } = require('./middlewares/customMiddleware');
const { globalErrorHandler } = require('./middlewares/errorHandler');
const { urlVersioning } = require('./middlewares/apiVersioning');
const { createBasicRateLimiter } = require('./middlewares/rateLimiting');
const itemRoutes = require("./routes/item-routes.js");

const app = express();

// Middlewares
app.use(requestLogger);
app.use(addTimestamp)
// app.use(detectClientArchitecture);
app.use(express.json());
app.use(configureCors());
app.use(createBasicRateLimiter(100, 15)); // 100 requests per 15 minutes
app.use(urlVersioning('v1'));
// Sample route
app.get('/api/v1', (req, res) => {
    res.send('Hello, World Edited!');
});
app.use("/api/v1", itemRoutes);
app.use(globalErrorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
