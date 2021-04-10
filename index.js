const express = require('express');
const logger = require('./utils/logger');
const leaseRouter = require('./routes/lease-routes')
const handleErrors = require('./middlewares/errorHandleMiddleware')
const protectedRoute = require('./middlewares/authMiddleware')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/leases', protectedRoute, leaseRouter)
app.use(handleErrors);

// const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const server = app.listen(PORT, () => {
    logger.info("🚀 The server started on port " + PORT)
});

module.exports = { app, server };
