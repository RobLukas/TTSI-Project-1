var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";

adminRouter.all('/panel', function(req, res, next){
    if(!req.user || !req.user.isAdmin){
        res.redirect('/');
    }
    next();
});

adminRouter.all('/panel/create', function(req, res, next){
    if(!req.user){
        res.redirect('/admin');
    }
    next();
});

adminRouter.all('/panel/create/add', function(req, res, next){
    if(!req.user){
        res.redirect('/admin');
    }
    next();
});

adminRouter.all('/panel/delete/:_id', function(req, res, next){
    if(!req.user){
        res.redirect('/admin');
    }
    next();
});

adminRouter.get('/panel', function(req, res){
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        collection.find().toArray(function(err, results) {
            res.render('panel', {
                users: results
            });
        });
    });
});

adminRouter.post('/signIn', passport.authenticate('local', {
    failureRedirect: '/'
}), function (req, res) {
    if(!req.user.isAdmin) {
        console.log("er");
    }
    res.redirect('/admin/panel');
});

adminRouter.get('/panel/create', function (req, res) {
    res.render('createUser');
});

adminRouter.post('/panel/create/add', function (req, res) {
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        var photos = [];
        var user = {
            username: req.body.username,
            password: req.body.password,
            photos: photos
        }
        collection.find({ username: user.username }).count(function(err, result) {
            if (result == 0)
            {
                collection.insert(user, function (err) {
                    if (err){
                        res.redirect('/admin/panel');
                        console.log(err);
                    }
                });
            }
            res.redirect('/admin/panel');
        });
    });
});

adminRouter.get('/panel/delete/:_id', function (req, res) {
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        collection.remove( { "_id": ObjectId(req.params._id) }, function(err, result){
            console.log(req.params._id);
            if (!err){
                res.redirect('/admin/panel');
            }
            else {
                console.log(err);
            }
            db.close();
        });
    });
});

adminRouter.get('/panel/logout', function (req, res) {
    req.session.destroy();
    req.logout();
    console.log('Logout success');
    res.redirect('/');
});

module.exports = adminRouter;