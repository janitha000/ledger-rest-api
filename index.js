const express = require('express');
const logger = require('./utils/logger');

const app = express();
const leaseRouter = require('./routes/lease-routes')
const handleErrors = require('./middlewares/errorHandleMiddleware')

const PORT = process.env.PORT || 5000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/leases', leaseRouter)
app.use(handleErrors);

app.listen(PORT, () => {
    logger.info("🚀 The server started on port " + PORT)
});