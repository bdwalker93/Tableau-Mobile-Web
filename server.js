var express = require("express");
var app     = express();
var path    = require("path");


app.use(express.static('.'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/App',function(req,res){
  res.sendFile(path.join(__dirname+'/browser.js'));
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

app.listen(3000);

console.log("Running at Port 3000");

