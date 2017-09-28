var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var markets = require('./routes/markets');
var cors = require('cors');

var app = express();


app.set('view engine', 'jade');
// app.use(cors({origin: 'http://139.59.236.13:53364'}));


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 53364);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/notis')));
app.use(express.static(__dirname ));

app.get('/markets/coupang',markets.coupang);
app.get('/markets/naverShop',markets.naverShop);

app.get('/markets/coupangDetail',markets.coupangDetail);


// app.get('/health',function(req,res){
//     res.end('hi')
// });


module.exports = app;
http.createServer(app).listen(app.get('port'), function() {
  console.log('Urungs Server run')
});
