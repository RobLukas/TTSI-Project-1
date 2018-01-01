var express = require('express');
var photoRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

// var photos = [];

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

// photoRouter.get('/', function (req, res) {
//     console.log(req.user);
//     // var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";
//     // mongodb.connect(url, function (err, db) {
//     //     var collection = db.collection('users');
//     //     collection.find({}).toArray(
//     //         function(err, result) {
//     //             console.log(result);
//     //             res.render('photos', {
//     //                 title: 'Photo',
//     //                 photo: result
//     //             });
//     //         });
//     //     // var photo = collection.distinct('photos');
//     //     // console.log(collection.distinct('photos'));
//     // });
// });

photoRouter.get('/add', function (req, res) {
    res.render('addPhoto');
});

// photoRouter.post('/add/save', function (req, res){
//     var url = "mongodb://zolwik:yolo123@ds113915.mlab.com:13915/gallery";
//     mongodb.connect(url, function (err, db) {
//         var collection = db.collection('users');
//         var photos = {
//             name: req.body.photoName,
//             path: req.body.photoPath
//         };
//         collection.insert(photos, function (err, results) {
//             console.log(results);
//             res.redirect('/auth/profile/photos');
//         });
//     });
// });

module.exports = photoRouter;