var express = require('express');
var profileRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

profileRouter.get('/logout', function (req, res) {
    req.session.destroy();
    req.logout();
    console.log('Logout success');
    res.redirect('/');
});

// profileRouter.all('/photos', function (req, res, next) {
//     if (!req.user) {
//         res.redirect('/');
//     }
//     next();
// });

profileRouter.all('/videos', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

profileRouter.all('/settings', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

profileRouter.get('/videos', function (req, res) {
    console.log(req.params.user);
    res.render('videos', {
        title: 'Videos'
    });
});

profileRouter.get('/settings', function (req, res) {
    res.render('settings', {
        title: 'Settings'
    });
});

module.exports = profileRouter;