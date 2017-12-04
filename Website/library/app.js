var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/galleryDB";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database connected!");
    db.close();
});

var app = express();

var port = process.env.PORT || 5000;

var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'jade');

app.use('/Auth', authRouter);
app.use('/Admin', adminRouter);

app.get('/', function (req, res) {
    res.render('log');
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    if (err)
        console.log(err);
    else
        console.log('running server on port ' + port);
});