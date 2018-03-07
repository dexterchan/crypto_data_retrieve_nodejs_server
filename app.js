var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var zlib = require('zlib');
var app = express();
var fs = require("fs");

const uuidv1 = require('uuid/v1');

var publicFolder=__dirname+'/public/';
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(publicFolder));

var srcPath="/Users/dexter/temp/cryptoData/";


app.get('/mkt/:ccy', function (req, res) {
    var filename="live.mkt."+req.params.ccy+".csv";
    var tempFile=publicFolder+filename+uuidv1()+".gz";
    // Compress the file input.txt to input.txt.gz
    fs.createReadStream(srcPath+filename)
    .pipe(zlib.createGzip()).pipe(res);
   // .pipe(fs.createWriteStream(tempFile))

 });


 var server = app.listen(8082,  function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
 })