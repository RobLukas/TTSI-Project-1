var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userNameAdmin',
        passwordField: 'passwordAdmin',
    },
    function (username, password, done) {
        var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('admin');
            collection.findOne({
                    username: username
                },
                function (err, results) {
                    if (err){
                        return done(err);
                    }
                    if (!results.username) {
                        return done(null, false, {
                            message: 'Incorrect username.'
                        });
                    }
                    if (results.password === password) {
                        var user = results;
                        done(null, user);
                    } else {
                        done(null, false, {
                            message: 'Bad password'
                        });
                    }
                }
            );
        });
    }));
};