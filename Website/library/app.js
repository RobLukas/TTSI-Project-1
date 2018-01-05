var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser('library'));
app.use(session({
    secret: 'library',
    // name: 'cookie_name',
    // store: 'sessionStore', // connect-mongo session store
    // proxy: true,
    resave: true,
    saveUninitialized: true
}));

require('./src/config/passport')(app);
require('./src/config/passport-admin')(app);

app.set('views', './src/views');
// app.set('views', './src/viewsAdmin');
app.set('view engine', 'jade');

var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes');
var profileRouter = require('./src/routes/profileRoutes');
var photoRouter = require('./src/routes/photoRoutes');

app.use('/Auth', authRouter);
app.use('/Admin', adminRouter);
app.use('/Auth/Profile', profileRouter);
app.use('/Auth/Profile/Photos', photoRouter);

app.get('/', function (req, res) {
    res.render('log');
});

app.get('/admin', function (req, res) {
    res.render('adminLogin');
});

app.listen(port, function (err) {
    if (err)
        console.log(err);
    else
        console.log('running server on port ' + port);
});