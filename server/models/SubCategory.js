//importing our mongoose dependency
const { Schema, model } = require('mongoose');

//setting up the schema model for SubCategory
const subCategorySchema = new Schema({
    subCategoryName: {
        type: String,
        required: true
    }
})

const SubCategory = model('SubCategory', subCategorySchema);

module.exports = SubCategory;