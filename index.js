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
  Book.find({}).then(function(books){
    res.send(books)
  })
})

server.get('/books/:id', function(req, res, next){
  var id = req.params.id
  Book.findById(id).then(function(book){
    res.send(book)
  }).catch(function(err){
    res.send(err)
  })
})

server.post('/books', function(req, res, next){
    var newBook = req.body.book
    Book.create(newBook)
      .then(function(newlyCreatedBook){
        res.send(newlyCreatedBook)
      })
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



// Book IN THE DATABASE
var Schema = mongoose.Schema
var BookSchema = new Schema({
  title: {type: String, required: true},
  published: {type: Number, required: true},
  rating: {type: String, required: true, default: '3 bubbles'},
  author: {type: String, required: true}
})

var Book = mongoose.model('Book', BookSchema)


