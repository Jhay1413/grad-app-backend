const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    CategoryName : String
})

const CategoryModel = mongoose.model('Category', CategorySchema, 'Category');

module.exports = CategoryModel;