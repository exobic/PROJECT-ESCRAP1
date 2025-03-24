const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authmiddleware');
const ProductController = require('../controller/ProductController');

// Updated Multer configuration for file upload to S3
const upload = require('../config/s3'); // Adjust the path to your s3.js file

router.get('/get-products', ProductController.getProducts);

// Add a new product
router.post('/add-products', protect, isAdmin, upload.fields([{ name: 'images', maxCount: 20 }, { name: 'videos', maxCount: 20 }]), ProductController.addProduct);

router.put('/products/:id', protect, isAdmin, ProductController.updateProduct);
router.delete('/products/remove/:productId', protect, isAdmin, ProductController.deleteProduct);
router.get('/products/search', ProductController.searchProducts);
router.get('/products/filters', ProductController.getFilterOptions);
router.get('/products/:id', ProductController.getProductById);

module.exports = router;
