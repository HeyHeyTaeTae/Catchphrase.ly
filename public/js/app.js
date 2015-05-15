// on page load
$(function(){
  // get and render the phrase
  Phrases.all();
  View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {};
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

View.init = function() {
  console.log("This is happening yo.")
  $("#newPhrase").on("submit", function(e) {
    ("This too is happening yo.")
    e.preventDefault();
    var phraseParams = $(this).serialize();
    Phrases.create(phraseParams);
    });
  }
 
// PHRASES OBJECT
function Phrases() {};
Phrases.all = function() {
  $.get("/phrases", function(res){ 
    // parse the response
    var phrases = JSON.parse(res);
    // render the results
    View.render(phrases, "phrases-ul", "phrases-template");
  });
};

Phrases.create = function(phraseParams) {
  $.post("/phrases", phraseParams).done(function(res){
    // once done, re-render all foods
    Phrases.all();
  }).done(function(res){
    // reset form
    $("#newPhrase")[0].reset();
  });
}

Phrases.delete = function(phrase) {
  var phraseId = $(phrase).data().id;
  $.ajax({
    url: '/phrases/' + phraseId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all foods
      Phrases.all();
    }
  })
};