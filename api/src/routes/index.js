const auth = require('./auth');
const express = require('express');
const router = express.Router();
const routes = (app) => {
    app.use('/api/auth', auth);
    
}
module.exports = routes