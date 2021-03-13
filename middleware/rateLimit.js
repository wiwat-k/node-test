const express = require('express')
const app = express()

// Require RateLimit for limit api request
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

exports.limiter = limiter;