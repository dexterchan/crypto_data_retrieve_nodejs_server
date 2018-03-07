var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var zlib = require('zlib');
var app = express();
var fs = require("fs");
const args = require("args-parser")(process.argv)

const uuidv1 = require('uuid/v1');

var publicFolder=__dirname+'/public/';
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(publicFolder));


var srcPath="/mnt/download/cryptoData/";
if(args.p != undefined){
    srcPath=args.p+"/";
}

app.get('/mkt/:ccy', function (req, res) {
    var filename=srcPath+"live.mkt."+req.params.ccy+".csv";
    fs.exists(filename, function(exists){
        if (exists) {
            var tempFile=publicFolder+filename+uuidv1()+".gz";
            // Compress the file input.txt to input.txt.gz
            fs.createReadStream(filename)
            .pipe(zlib.createGzip()).pipe(res);
        // .pipe(fs.createWriteStream(tempFile))
        }else{
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("ERROR mkt "+req.params.ccy+" does NOT Exists.");
        }
    });

 });

 app.get('/tweet/:ccy', function (req, res) {
    var filename=srcPath+"live.tweet."+req.params.ccy+".csv";
    fs.exists(filename, function(exists){
        if (exists) {    
            var tempFile=publicFolder+filename+uuidv1()+".gz";
            // Compress the file input.txt to input.txt.gz
            fs.createReadStream(filename)
            .pipe(zlib.createGzip()).pipe(res);
        // .pipe(fs.createWriteStream(tempFile))
        }else{
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("ERROR tweet "+req.params.ccy+" does NOT Exists.");
        }

    });

 });


 var server = app.listen(8082,  function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
 })