const express = require('express');
const { addProduct, upload } = require('../controllers/productController');
const Product = require('../models/Product');  // Ensure Product model is imported
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();  // Fetch all products from the DB
    res.status(200).json(products);  // Send the products in the response
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Route to add a new product
router.post('/add', protect, admin, upload.single('image'), addProduct);  // Ensure the image is uploaded using multer

module.exports = router;
