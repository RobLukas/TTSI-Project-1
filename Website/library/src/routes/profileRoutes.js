var express = require('express');
var profileRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

profileRouter.get('/logout', function (req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
});

profileRouter.all('/:_id', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

profileRouter.get('/:_id', function (req, res) {
    // res.render('profile');
    res.send(req.user);
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

profileRouter.get('/photos', function (req, res) {
    res.render('photos', {
        title: 'Photos'
    });
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