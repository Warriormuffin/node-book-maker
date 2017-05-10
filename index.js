var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var server = express()
var port = 3000
var Book = require('./models/book')
var Movie = require('./models/movie')
var routes = require('./routes')


// Database logic
var mongoose = require('mongoose')
var connectionString = 'mongodb://nathan:nathan@ds131099.mlab.com:31099/nathans-books'
var connection = mongoose.connection;


//Middleware below
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true}))
server.use(cors())
server.use('/', express.static(`${__dirname}/app/`))
server.use(routes.router) //My own routes should come after bodyParser and Cors(security)

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



// server.get('/', function(req, res, next){
//   res.send(200, 'I can hear you......')
// })

// server.get('/books', function(req, res, next){
//   Book.find({}).then(function(books){
//     res.send(books)
//   })
// })

// server.get('/books/search', function(req, res, next){
//   var query = req.query
//   Book.find({query}).then(function(book){
//     res.send(book)
//   })
// })

// server.get('/books/:id', function(req, res, next){
//   var id = req.params.id
//   Book.findById(id).then(function(book){
//     res.send(book)
//   }).catch(function(err){
//     res.send(err)
//   })
// })

// server.post('/books', function(req, res, next){
//   debugger
//     var newBook = req.body
//     Book.create(newBook)
//       .then(function(newlyCreatedBook){
//         res.send(newlyCreatedBook)
//       })
// })

// server.put('/books/:id', function(req, res, next){
//   var id = req.params.id
//   var editedBook = req.body.book
//   Book.findByIdAndUpdate(id, editedBook)
//     .then(function(book){
//       res.send(book)
//     })
// })

// server.delete('/books/:id', function (req, res, next) {
//   var deleteBook = req.body;
//   books.splice(deleteBook, 1)
// })






