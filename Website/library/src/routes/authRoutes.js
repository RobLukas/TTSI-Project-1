var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

authRouter.post('/signUp', function (req, res) {
    var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        var photos = [];
        var user = {
            username: req.body.userName,
            password: req.body.password,
            photos: photos
        };
        collection.insert(user, function (err) {
            if (err){
                res.redirect('/');
            }
            req.login(user, function () {
                res.redirect('/auth/profile');
            });
        });
    });
});

authRouter.post('/signIn', passport.authenticate('local', {
    failureRedirect: '/'
}), function (req, res) {
    res.redirect('/auth/profile');
});

module.exports = authRouter;