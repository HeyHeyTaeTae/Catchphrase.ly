var express = require("express"),
 app = express(),
 bodyParser = require("body-parser"),
 path = require("path"),
 _ = require("underscore");

// var views = path.join(process.cwd(), "views");

var phrase = [
	{id:0, word: "Boolean", definition: "Data type with two values: True or False."},
	{id:1, word: "UNIX", definition: "One of the first operating systems."},
	{id:2, word: "In-Place Algorithm", definition: "A function that evaluates without changing state."},
	{id:3, word: "Callback", definition: "Calling a function within another function."},
	{id:4, word: "Rubber Ducky Debugging", definition: "Talking to a rubber duck to debug your code"},
];
app.use(express.static(__dirname + "/public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname + '/public/views/home.html'));
})

app.get("/phrases", function (req, res){
  // render foods index as JSON
  res.send(JSON.stringify(phrase));
});

app.post("/phrases", function(req, res){
	var newPhrase = req.body;
	if(newPhrase >= 1) {
	newPhrase.id = phrase[phrase.length-1].id + 1;
	} else {
		newPhrase.id = 0;
	}
	phrase.push(newPhrase);
	res.send(JSON.stringify(newPhrase));
});

app.delete("/phrases/:id", function (req, res){
  // set the value of the id
  var targetId = parseInt(req.params.id, 10);
  // find item in the array matching the id
  var targetItem = _.findWhere(phrase, {id: targetId});
  // get the index of the found item
  var index = phrase.indexOf(targetItem);
  // remove the item at that index, only remove 1 item
  phrase.splice(index, 1);
  // render deleted object
  res.send(JSON.stringify(targetItem));
});

app.listen(3000, function() {
	console.log("Dis workin");
})