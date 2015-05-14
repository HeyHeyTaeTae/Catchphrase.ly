$(function(){
  Phrase.all();
});

function View() {};
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

function Phrase() {};
Phrase.all = function() {
  $.get("/phrase", function(res){ 
    // parse the response
    var phrase = JSON.parse(res);
    // render the results
    View.render(phrase, "phrases-ul", "phrase-template");
  });
};