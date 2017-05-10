function MovieController(){
  var movieService = new MovieService();


  this.saveMovies = function saveMovies(e){
    e.preventDefault();
    var movie = {
      title: e.target.title.value,
      director: e.target.director.value,
      studio: e.target.studio.value,
      release: e.target.release.value
    }
    movieService.saveMovie(movie)
  }


}