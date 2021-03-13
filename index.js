const express = require('express')
const app = express()

// Require .env file
const dotenv = require('dotenv');
dotenv.config();

// Require body-parser for json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//  Swagger UI Express ใช้สร้าง API Documents
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
// Set URL API Documents
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Config CORS Allow Access http
const cors = require('cors')
const allowedOrigins = ['*'] // * Allow All http
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf('*') === 1 && allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(msg, false)
        }
        return callback(null, true)
    }
}));


// Require Route from API
const user = require('./api/user');
app.use('/api/user', user);

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`));