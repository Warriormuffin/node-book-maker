function FormController() {
  var formService = new FormService()
  formService.getBooks(function (books) {
    drawBooks(books)
  })

  this.saveBook = function saveBook(e) {
    e.preventDefault()
    var book = {
      title: e.target.title.value,
      published: e.target.published.value,
      rating: e.target.rating.value,
      author: e.target.author.value
    }
    // var book = title + published + rating + author
    formService.saveBook(book)

  }

  function drawBooks(books) {
    var template = ""
    var elem = document.getElementById('books-list')
    for (var i = 0; i < books.length; i++) {
      var book = books[i];
      template += `
        <p>${book.title}</p>
        <p>${book.published}</p>
        <p>${book.rating}</p>
        <p>${book.author}</p>
    `
    }
    elem.innerHTML = template

  }


}