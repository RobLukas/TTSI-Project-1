var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

authRouter.post('/signUp', function (req, res) {
    var url = "mongodb://localhost:27017/galleryDB";
    // var url = "mongodb://<lashoow>:<pirat123123>@ds113915.mlab.com:13915/gallery";
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        var photos = [];
        photos.push({
            name: 'obrazek1',
            path: 'https://nodejs.org/static/images/logos/nodejs-green.png'
        });
        photos.push({
            name: 'obrazek2',
            path: 'http://www.wst.com.pl/images/kierunki/oprogramowanie/corel.jpg'
        });
        var films = [];
        var user = {
            username: req.body.userName,
            password: req.body.password,
            photos: photos,
            films: films
        };
        collection.insert(user, function (err, results) {
            req.login(results, function () {
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

authRouter.all('/profile', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

authRouter.get('/profile', function (req, res) {
    res.render('profile');
    // res.json(req.user);
    // res.send(req.params.user);
});

module.exports = authRouter;