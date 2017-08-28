const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done){
        const user = {
            username: username,
            password: password
        };
        done(null, user);
    }));
};