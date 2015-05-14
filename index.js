var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var views = path.join(process.cwd(), "views");

var phrase = [
				{id:0, word: "Boolean", definition: "Data type with two values: True or False."},
				{id:1, word: "UNIX", definition: "One of the first operating systems."},
				{id:2, word: "In-Place Algorithm", definition: "A function that evaluates without changing state."},
				{id:3, word: "Callback", definition: "Calling a function within another function."},
				{id:4, word: "Rubber Ducky Debugging", definition: "Talking to a rubber duck to debug your code"},
			 ];
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
	console.log("test");
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
})

app.get("/Phrases", function (req, res){
  // render foods index as JSON
  res.send(JSON.stringify(Phrase));
});

app.listen(3000, function() {
	console.log("Dis workin");
})