const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Product = require('../models/Product');

//@route   GET api/v1/products
//@desc    Get all products
router.get('/', async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json({ data: products });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

//@route   POST api/v1/products
//@desc    Add product
router.post(
	'/',
	[
		check('name', 'name is required').not().isEmpty(),
		check('price', 'price is required').not().isEmpty(),
		check('sku', 'sku is required').not().isEmpty(),
		check('brand', 'brand is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, price, sku, brand } = req.body;
		try {
			const newProduct = new Product({
				name,
				price,
				sku,
				brand,
			});

			const product = await newProduct.save();
			res.status(200).json({ data: product, msg: 'Product created' });
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
	}
);

//@route   GET api/v1/products/:id
//@desc    Get single product
router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		//Check if product exists
		if (!product) {
			return res.status(404).status.json({ msg: 'Product not found' });
		}
		res.status(200).json({ data: product });
	} catch (error) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

//@route   delete api/v1/products/:id
//@desc    Delete product
router.delete('/:id', async (req, res) => {
	try {
		let product = await Product.findById(req.params.id);
		//Check if product exists
		if (!product) {
			return res.status(404).status.json({ msg: 'Product not found' });
		}

		//Delete the product
		await Product.findByIdAndRemove(req.params.id);
		res.status(200).json({ msg: 'Product Removed ' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

module.exports = router;
