function MovieService(){

  var url = 'http://localhost/3000/movies'

  this.saveMovies = function saveMovies(book){
    $.post(url, book)

  }

  this.getMovies = function getMovies(){
    $.get(url)
  }
}