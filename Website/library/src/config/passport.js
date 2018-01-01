var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function(user, done){
        var sessionData = {};

        sessionData.user = user._id;
        done(null, user);
    });
    passport.deserializeUser(function(user, done){
        done(null, user);
    });

    require('./strategies/local.strategy')();
    // require('./strategies/local.strategy.admin')();
};