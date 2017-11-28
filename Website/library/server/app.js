var express = require('express');

var app = express();

var port = 5000;

app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    if(err)
        console.log(err);
    else
        console.log('running server on port ' + port);
});