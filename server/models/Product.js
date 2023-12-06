//importing our mongoose dependency
const { Schema, model } = require('mongoose');

//setting up the schema model for Product
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },    
    subCategoryID: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: false, 
    },
    salePrice: {
        type: Number,
        default: false, 
    },  
    quantity: {
        type: Number,
        min: 0,
        default: 0
      },
    createdAt: {
        type: Date,
        default: Date.now
      },
})

const Product = model('Product', productSchema);

module.exports = Product;