var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var config = require('./config');

var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




// development error handler
require('./routes')(app);
app.use(function(err, req, res, next) {
    if(err){
        console.error(err);
        if(typeof err == "number"){
            err = new HttpError(err);
        }
        if(err instanceof HttpError){
            res.sendHttpError(err);
        }else if(err instanceof DbError){
            res.sendDBError(err);
        }else{
            res.statusCode = (err.status || 500);
        }
        res.end();
    }



});



module.exports = app;
