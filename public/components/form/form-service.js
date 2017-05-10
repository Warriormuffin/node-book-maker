function FormService(){
  var url = "http://localhost:3000/books"


  this.saveBook = function saveBook(book){
      $.post(url, book)
  }
  this.getBooks = function getBooks(callWhenDone){
    $.get(url, function (res){
      callWhenDone(res)
    })
  }
}