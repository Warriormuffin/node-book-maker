var express = require('express')
var bodyParser = require('body-parser')
var server = express()
var port = 3000


// Database logic
var mongoose = require('mongoose')
var connectionString = 'mongodb://nathan:nathan@ds131099.mlab.com:31099/nathans-books'
var connection = mongoose.connection;


//DOES NOT CHANGE
mongoose.connect(connectionString, {
  server: { socketOptions: { keepAlive: 30000, connectTimeoutMs: 30000 } },
  replset: { socketOptions: { keepAlive: 30000, connectTimeoutMs: 30000 } }
})

// => is shorthand for a function
connection.on('error', (err) => {
  console.log('There WAS A CONNECTION PROBLEM', err)
})

connection.once('open', () => {
  console.log('We are now connected to the books database')
  server.listen(port, () =>{
    console.log('Yep its working', 'http://localhost:' + port)
  })
})


server.use(bodyParser.json())

server.get('/', function(req, res, next){
  res.send(200, 'I can hear you......')
})

server.get('/books', function(req, res, next){
  res.send(books)
})

var books = [{
  title: "Harry Potter",
  published: "2003",
  rating: "5 Bubbles",
  Author: "JK Rowling"
}, {
  title: "Harry Potter 2",
  published: "2004",
  rating: "5 Bubbles",
  Author: "JK Rowling"
}, {
  title: "Harry Potter 3",
  published: "2005",
  rating: "5 Bubbles",
  Author: "JK Rowling"
}, {
  title: "Harry Potter 4",
  published: "2006",
  rating: "5 Bubbles",
  Author: "JK Rowling"
}
]

server.get('/books/:id', function(req, res, next){
  var id = req.params.id
  if(books[id]){
    res.send(books[id])
  }else res.send(404, {
    error: {
      message: "Sorry no books located at" + id
    }
  })
})

server.post('/books', function(req, res, next){
    var newBook = req.body
    if(newBook.title && newBook.author && newBook.published && newBook.rating){
      books.push(newBook)
      res.send('New Book was added')
    }else{
      res.send('You must provide an Author, Published Date, Rating, and Author')
    }

})

server.put('/books/:id', function(req, res, next){
  var id = req.params.id
  var editBook = req.body
  debugger
  if(editBook.rating !== books[id].rating){
    books[id].rating = editBook.rating
    res.send("Book rating has been updated")
  }else{
    res.send("You must provide a different rating")

  }
})

server.delete('/books/:id', function (req, res, next) {
  var deleteBook = req.body;
  books.splice(deleteBook, 1)
})


// server.listen(port, function(){
//   console.log("We are listening on port: ", port)
// })


