var config = require('../config');
var host = config.get('general:host');
var carCounter = 0;
var maxCarCounter = 4;

var parking = {
    firstLeft: 0,
    firstRight: 0,
    secondLeft: 0,
    secondRight: 0
};
var indexToPlace = ['firstLeft', "firstRight", "secondLeft", 'secondRight'];
module.exports = function(app){

    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        console.log(parking);
        next();

    });

    app.get('/', function(req, res, next){

       /* res.render('index', {
            freeSpaces: maxCarCounter - carCounter,
            parking: parking
        });
        */
        res.json({
            freeSpaces: maxCarCounter - carCounter,
            parking: parking
        });

        next();
    });
    app.get('/test', function(req, res, next){
        res.send("Привет");
        res.end();
        next();
    });
    app.post('/newCar/:place', function(req, res, next){
        var status = 200;
        var place = req.params.place;
        if((place - 1 >= 0) && (place - 1 < 4)){
            parking[indexToPlace[place - 1]] = 1;
            carCounter++;
        }else{
            status = 400;
        }
        res.sendStatus(status);
        res.end();

        next();
    });

    app.post('/removeCar/:place', function(req, res, next){
        var place = req.param.place;
        if(place - 1 >= 0 && place - 1 < 4){
            parking[indexToPlace[place - 1]] = 0;
            carCounter--;
        }
        res.end(200);
        next();
    })








}
