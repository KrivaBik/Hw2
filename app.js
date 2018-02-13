const express =require('express');
var winston = require('winston');
var fs = require("fs");
var sql = require('mssql');

var nodeEnv = process.env.NODE_ENV;
const app= express();

var list=['вася','оля', 'игорь', 'валера', 'я'];
var listJson = JSON.stringify(list);

// config for your database
var config = {
    user: 'sa',
    password: '33421pop',
    server: 'localhost',
    database: 'GMSData38',
    options: {
        encrypt: true
    }
};
sql.connect(config, function (err) {
    console.log("connect to GMSData38");
    if (err) console.log(err); });

// connect to your database
// sql.connect(config, function (err) {
//     console.log("connect to GMSData38");
//     if (err) console.log(err);
//     var request = new sql.Request();
//     request.query('select ChID,ProdID,ProdName,UM,Country,Notes,PGrID,Article1 from r_Prods WHERE ChID<20;', function (err, recordset) {
//         if (err) console.log(err);
//         console.log(recordset);
//
//     });
// });

var loggerTransports= [];
if(nodeEnv=='development')
    loggerTransports.push(new winston.transports.Console({level: 'debug'}));
else
    loggerTransports.push(new winston.transports.File({ filename: 'combined.log',level: 'info' }));
const logger = new (winston.Logger)({ transports: loggerTransports });


app.use(function (req,res,next) {
    logger.info(req.url);
    next();
});

app.get('/', function(req, res){
    res.send('Hello W');
});
app.get('/1', function(req, res){
    res.send(listJson);
});
app.get('/2', function (req, res) {
    res.sendFile(__dirname+"/kek.txt");

});
app.get('/3', function (req, res) {
    res.sendFile(__dirname+"/package.json");
});
app.get('/4', function (req, res) {
    res.sendFile(__dirname+"/kek.html");
});
var list2;
app.get('/list', function (req,res) {
    if(!list2) list2=JSON.parse(fs.readFileSync(__dirname+"/name.json", "utf8"));
    list2.push("asdf");
    res.send(JSON.stringify(list2));
});
var nameString;
app.get('/2/getList',function (req,res) {
    if(!nameString) nameString=JSON.parse(fs.readFileSync(__dirname+"/name.json", "utf8"));
    nameString
        .push("Name");
    res.send(nameString);
});

app.get('/2/getListFromDb',function (req,res) {

    var request = new sql.Request();
    request.query('select ChID,ProdID,ProdName,UM from r_Prods WHERE ChID<20;', function (err, recordset) {
        if (err) console.log(err);
        res.send(recordset.recordset);
    });


});

app.listen(3000, function(){
    console.log('s w');
    console.log(nodeEnv);
});
