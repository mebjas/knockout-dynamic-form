var path = require('path');
var sprintf = require('sprintf').sprintf;
var express = require('express');

var app = express();
var port = 8099;

app.use(express.static('external'))

app.listen(port, function(){
    console.log(sprintf('app started, listening to %s', port));
});

// get - page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'file.htm'));
});

// get - script
app.get('/script', function(req, res) {
    res.sendFile(path.join(__dirname, '/../src/script.js'));
});

// get json data
app.get('/data', function(req, res) {
    var data = require('./data.json');
    res.json(data);
});