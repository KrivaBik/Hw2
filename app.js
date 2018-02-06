const express =require('express');
var winston = require('winston');

var nodeEnv = process.env.NODE_ENV;
const app= express();

var list=['вася','оля', 'игорь', 'валера', 'я'];
var listJson = JSON.stringify(list);

var loggerTransports= [];
if(nodeEnv=='development')
    loggerTransports.push(new winston.transports.Console({level: 'debug'}));
else
    loggerTransports.push(new winston.transports.File({ filename: 'combined.log',level: 'info' }));
const logger = new (winston.Logger)({ transports: loggerTransports });

// logger.info('Hello world');
// logger.warn('Warning message');
// logger.debug('Debugging info');

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

app.listen(3000, function(){
    console.log('s w');
    console.log(nodeEnv);
});
