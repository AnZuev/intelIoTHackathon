var config = require('../config');
var host = config.get('general:host');
var carCounter = 0;
var maxCarCounter = 4;

var prevParkingContext = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};
var booking = {
    1:0,
    2:0,
    3:0,
    4:0
};


var changesOfParkingContext = {

};
module.exports = function(app){

    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();

    });

    app.get('/', function(req, res, next){

        res.json({
            freeSpaces: maxCarCounter - carCounter,
            parking: prevParkingContext
        });

        next();
    });
    app.get('/test', function(req, res, next){
        res.send("Привет");
        res.end();
        next();
    });
    app.post('/parkingContext/', function(req, res, next){
        var status = 200;
        cmpOldParkingContextWithNew(req.body);
        console.log(changesOfParkingContext);
        res.sendStatus(status);
        res.end();
        next();
    });
    app.get('/parkingContext', function(req, res, next){
        var parkingContext = {
           freeSpaces:getFreePlaces(),
           parkingContext: prevParkingContext
        };
        res.json(parkingContext);
    });

    app.post('/bookPlace', function(req, res, next){
        var place = req.body.place;
        if(!prevParkingContext[place.toString()]) prevParkingContext[place.toString()] = 0;

    })










}

function cmpOldParkingContextWithNew(newParkingContext){
    for(var key in prevParkingContext){
        if(newParkingContext[key] != prevParkingContext[key]){
            changesOfParkingContext[key] = newParkingContext[key]
        }
    }
    prevParkingContext = newParkingContext;
    return;
}

function getFreePlaces(){
    var counter = 0;
    for(var key in prevParkingContext){
        if(prevParkingContext[key]) counter++;
    }
    return counter;
}