var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

// var router = function(){
//     authRouter.route('/signUp')
//         .post(function (req, res) {
//             console.log(req.body);
//             res.send('signUp');
//             req.login(req.body, function(){
//                 res.redirect('/auth/profile');
//             });
//         });
//     authRouter.route('/profile')
//         .get(function(req, res){
//             res.json(req.user);
//             res.render('profile');
//         });
//     return authRouter;
// };

// module.exports = router;

authRouter.post('/signUp', function (req, res) {
    console.log(req.body);
    var url = "mongodb://localhost:27017/galleryDB";
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        var user = {
            username: req.body.userName,
            password: req.body.password
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
    console.log(id);
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

// authRouter.get('/:username', function (req, res) {
//     res.send(req.params.user);
// });

module.exports = authRouter;