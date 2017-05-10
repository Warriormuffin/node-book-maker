function FormController(){
  var formService = new FormService()

  this.getBook = function getBook(e){
    e.preventDefault()
    debugger
    var title = e.target.title.value
    var published = e.target.published.value
    var rating = e.target.rating.value
    var author = e.target.author.value
    // var book = title + published + rating + author
    formService.saveBook(title, published, rating, author)
  }


}