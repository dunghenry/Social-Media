const auth = require('./auth');
const user = require('./user');
const post = require('./post');
const routes = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/user', user);
    app.use('/api/post', post);
}
module.exports = routes