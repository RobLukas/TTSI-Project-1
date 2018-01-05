var express = require('express');
var photoRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";

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
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
            var add = {
                _id: new ObjectId(),
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

photoRouter.get('/delete/:_id', function (req, res){
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        collection.remove( { _id: ObjectId(req.params._id) } , function(err, result){
            console.log(req.params._id);
            if (!err){
                res.redirect('/auth/profile/photos');
            }
            else {
                console.log(err);
                res.redirect('/auth/profile/photos');
            }
            db.close();
        });
    });
});
module.exports = photoRouter;