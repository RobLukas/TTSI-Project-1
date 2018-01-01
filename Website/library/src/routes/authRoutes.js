var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
// const mongoose = require('mongoose');
var passport = require('passport');
// var userModel = mongoose.model('User');

var user;
authRouter.post('/signUp', function (req, res) {
    var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";
    // const new_Account = new userModel(req.body).save();
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        var photos = [];
        // photos.push({
        //     name: 'obrazek1',
        //     path: 'https://nodejs.org/static/images/logos/nodejs-green.png'
        // });
        // photos.push({
        //     name: 'obrazek2',
        //     path: 'http://www.wst.com.pl/images/kierunki/oprogramowanie/corel.jpg'
        // });
        user = {
            username: req.body.userName,
            password: req.body.password,
            photos: photos
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
    res.render('profile', {
        user: req.user
    });
});

authRouter.get('/profile/photos', function (req, res) {
    res.render('photos', {
        title: 'Photos',
        photo: user.photos
    });
    // console.log(req.user);
});

authRouter.post('/profile/photos/add/save', function (req, res){
    var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";
    // if (req.session && req.session.user){

    // }
    // console.log(req.session.passport.user);
    // console.log(req.session.passport.user.id);
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        collection.findOne({
            user: req.session.passport.user
        },
        function(err, result){
            if(err){
                // console.log(err);
            }
            console.log(result);
        });
        var add = {
            name: req.body.photoName,
            path: req.body.photoPath
        }
        // console.log(user.photos);
        // userPhoto.photos = add;
        user.photos.push(add);
        collection.update(user, req.user, function (err, results) {
            req.login(results, function () {
                res.redirect('/auth/profile/photos');
            });
            
        });
    });
});

module.exports = authRouter;