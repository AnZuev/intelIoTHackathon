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

var reverse = 0;

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
        console.log(req.body);
        var refresh = cmpOldParkingContextWithNew(req.body, reverse);
        if(refresh){
            res.send(prevParkingContext);
        }else{
            res.sendStatus(status);
            res.end();
        }
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


function cmpOldParkingContextWithNew(newParkingContext, reserve){
    prevParkingContext = newParkingContext;
    if(reserve) {
        prevParkingContext.reserved++;
        prevParkingContext.freeSpaces--;
        return true;
    }
    return false;
}

function getFreePlaces(){
    var counter = 0;
    for(var i =0; i< prevParkingContext.places.length; i++){
        if(!prevParkingContext.places[i].isBusy) counter++;
    }
    return counter;
}