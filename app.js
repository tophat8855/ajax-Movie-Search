$(document).ready(function() {
  var searchURL = "http://www.omdbapi.com/?s=";
  var searchDetails = "http://www.omdbapi.com/?i=";
  var movieId;

  function initialize() {
    $('body').append($('<h1>Movie Search</h1>'));
    $('body').append($('<input placeholder="title search"></input>'));
    $('body').append($('<ul>'));
    $('input').keypress(entering);
    $('ul').on('click', 'li', showMovieInfo);
    $('body').append($('<div>'))
  }

  function listTheMovies(movies, movieID) {
    var movieList = $('<li>').data('imdbID', movieID);
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
      for (var i = 0; i < data.Search.length; i++) {
        listTheMovies(data.Search[i].Title, data.Search[i].imdbID);
      }
      $('input').val("");
    }).fail(function () {
      alert("it failed :(");
    });
  }

  function showMovieInfo() {
    $('div').html("");
    $.ajax({
      url: searchDetails + $(this).data('imdbID'),
      dataType: "json",
      type: "get"
    }).done(function(data) {
      console.log(data);
      var moviePoster = data.Poster;
      //$('body').append('<div>')
      $('div').append("Year:" + data.Year);
      $('div').append("Plot:" + data.Plot);
      $('div').append(data.Title);
      $('div').append($('<img src= ' + moviePoster + '></img>'));


    });

  }

  initialize();
});
