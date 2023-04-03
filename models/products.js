const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
})

const Products = mongoose.model('Products', productsSchema);

module.exports = Products

