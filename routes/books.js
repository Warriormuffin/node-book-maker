var router = require('express').Router();
var Book = require('./../models/book')

exports.mountPath = '/books'
exports.router = router

router.route('/books')
  .get(getBooks);

router.route('/')
.post(createBooks)


function getBooks(req, res, next){
    Book.find({}).then(function(books){
    res.send(books)
  })
}

function createBooks(req, res, next){
  var newBook = req.body
    Book.create(newBook)
      .then(function(newlyCreatedBook){
        res.send(newlyCreatedBook)
      })
}