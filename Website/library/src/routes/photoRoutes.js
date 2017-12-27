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
        title: 'Photo',
        // photos: JSON.stringify(req.user.photos)
        // photos: photos
    });
});

photoRouter.get('/add', function (req, res) {
    res.render('addPhoto');
});

photoRouter.get('/add/save', function (req, res){
    res.send('zdjecie dodane');
});

module.exports = photoRouter;