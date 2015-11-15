var config = require('../config');
var carCounter = 0;
var maxCarCounter = 4;

var prevParkingContext = {
    places:[],
    reserved:0,
    freeSpaces:0
};

var reserve = 0;

module.exports = function(app){

    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();

    });

    app.get('/', function(req, res, next){

        res.json({
            freeSpaces: getFreePlaces(),
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
        cmpOldParkingContextWithNew(req.body);
        res.send(reserve);
        res.end();
        next();
    });
    app.get('/parkingContext', function(req, res, next){
        res.json(prevParkingContext);
    });

    app.post('/bookPlace', function(req, res, next){
        var free = getFreePlaces();
        if(free > 0 ) reserve++;
        res.end();
    });
    app.post('/unbookPlace', function(req, res, next){
       if(reserve > 0) reserve--;
        res.end();
    })

    app.get('/mapp', function(req, res, next){
        res.render('mapp', {
            parkingContext: prevParkingContext
        });
    })

};


function cmpOldParkingContextWithNew(newParkingContext){
    prevParkingContext = newParkingContext;
}

function getFreePlaces(){
    var counter = 0;
    for(var i =0; i< prevParkingContext.places.length; i++){
        if(!prevParkingContext.places[i].isBusy) counter++;
    }
    return counter;
}