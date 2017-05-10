// Book IN THE DATABASE
var mongoose = require('mongoose')

var Schema = mongoose.Schema
var BookSchema = new Schema({
  title: {type: String, required: true},
  published: {type: Number, required: true},
  rating: {type: String, required: true, default: '3 bubbles'},
  author: {type: String, required: true}
})

var Book = mongoose.model('Book', BookSchema)

module.exports = Book;