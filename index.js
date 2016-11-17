var express = require('express');
var app = express();
var session = require('session');
var db = require('./db');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var controller = require('./controllers');

app.use(session({
  secret: 'sEcr3t-SesS1oN-t0K3N',
  saveUninitialized: false,
  resave: true
}));

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', controller);

app.use(function(req, res) {
    res.render('pages/404');
    return;
});

db.connect(function(err) {
    if(err) {
        console.log('Ei saa andmebaasiga ühendust');
        console.log(err);
        process.exit(1);
    } else {
        app.listen(3000, function() {
            console.log('Veebirakendus töötab pordil 3000');
        });
    }
});
