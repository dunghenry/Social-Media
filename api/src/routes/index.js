const auth = require('./auth');
const user = require('./user');
const post = require('./post');
const routes = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/users', user);
    app.use('/api/posts', post);
}
module.exports = routes