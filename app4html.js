var express = require('express');
var ejs = require('ejs');
var path = require("path");
var app = express();


app.set('views', path.join(__dirname, 'html'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

app.use("/first.html", function(req, res){
    res.render("first");
});
app.use("/second.html", function(req, res){
    res.render("second");
});
module.exports = app;