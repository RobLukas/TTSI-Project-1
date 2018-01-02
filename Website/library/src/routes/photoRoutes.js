var express = require('express');
var photoRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

photoRouter.all('/', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

photoRouter.all('/add', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

photoRouter.all('/add/save', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

photoRouter.get('/', function (req, res) {
    res.render('photos', {
        title: 'Photos',
        photo: req.user.photos
    });
});

photoRouter.get('/add', function (req, res) {
    res.render('addPhoto');
});

photoRouter.post('/add/save', function (req, res){
    var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
            var add = {
                name: req.body.photoName,
                path: req.body.photoPath
            }
            collection.findOneAndUpdate({
                username: req.user.username
            }, { $push: {photos: add} }, {returnOriginal: false}, function(err, results) {
                req.login(results.value, function () {
                    res.redirect('/auth/profile/photos');
                });
            });
        });
});

module.exports = photoRouter;