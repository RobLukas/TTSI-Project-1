var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

// var router = function () {
//     adminRouter.route('/')
//         .get(function (req, res) {
//             res.render('admin');
//         });
//     return adminRouter;
// };

adminRouter.get('/panel', function(req, res){
    res.render('panel');
});

adminRouter.post('/signIn', passport.authenticate('local', {
    failureRedirect: '/'
}), function (req, res) {
    res.redirect('/admin/Panel');
});

adminRouter.all('/panel', function(req, res, next){
    if(!req.user){
        res.redirect('/admin');
    }
    next();
});

module.exports = adminRouter;