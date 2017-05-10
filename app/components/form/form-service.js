function FormService(){
  this.saveBook = function saveBook(title, published, rating, author){
    var book = { title: title,
                  published: published,
                  rating: rating,
                  author: author
    }
    var url = "http://localhost:3000/books"
    $.get(url).then(function(){
      debugger
      $.post(url, book)
    })
  }
}