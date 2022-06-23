const auth = require('./auth');
const user = require('./user');
const express = require('express');
const router = express.Router();
const routes = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/users', user);
    
}
module.exports = routes