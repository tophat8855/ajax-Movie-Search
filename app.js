$(document).ready(function() {
  var searchURL = "http://www.omdbapi.com/?s="

  function initialize() {
    $('body').append($('<h1>Movie Search</h1>'));
    $('body').append($('<input placeholder="title search"></input>'));
    $('body').append($('<ul>'));
    $('input').keypress(entering);
  }

  function listTheMovies(movies) {
    var movieList = $('<li>');
    movieList.html(movies);
    $('ul').append(movieList);
  }

  function entering(e) {
    if (e.which != 13) { return; }
    var movieTitle = $.trim($('input').val());
    $.ajax({
      url: searchURL + movieTitle,
      dataType: "json",
      type: "get"
    }).done(function (data) {
      console.log(data.Search);
      for (var i = 0; i < data.Search.length; i++) {
        listTheMovies(data.Search[i].Title);
      }
      $('input').val("");
    }).fail(function () {
      alert("it failed :<");
    });
  }

  initialize();
});
