const express = require('express');
const logger = require('./utils/logger');

const app = express();

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    logger.info("🚀 The server started on port " + PORT)
    console.log("🚀 The server started on port " + PORT);
});