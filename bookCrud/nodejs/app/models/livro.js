var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var livroSchema = new Schema({
    autor: String,
    editora: String,
    genero: String,
    titulo: String

});

module.exports = mongoose.model('Livro', livroSchema);