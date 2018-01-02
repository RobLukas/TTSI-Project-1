var express = require('express');
var profileRouter = express.Router();

profileRouter.get('/logout', function (req, res) {
    req.session.destroy();
    req.logout();
    console.log('Logout success');
    res.redirect('/');
});

profileRouter.all('/', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

profileRouter.get('/', function (req, res) {
    res.render('profile', {
        user: req.user
    });
});

profileRouter.all('/photos', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

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