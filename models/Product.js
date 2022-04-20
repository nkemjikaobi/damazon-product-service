const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	sku: {
		type: Number,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
