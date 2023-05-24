const mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema({
    name: String
});

const CategorySchema = new mongoose.Schema({
    categoryName : String,
    subCategory : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory'
        }
    ]
})

const CategoryModel = mongoose.model('Category', CategorySchema, 'Category');
const SubCategoryModel = mongoose.model('SubCategory',subCategorySchema,'SubCategory');
module.exports = {
    CategoryModel,
    SubCategoryModel
};