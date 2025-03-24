const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authmiddleware');
const UserController = require('../controller/userController');
// const ProductController = require('../controllers/ProductController');

// Users routes
router.get('/users/', protect, isAdmin,  UserController.getUsers);

// Products routes
// router.get('/products', protect, isAdmin, ProductController.getProducts);

module.exports = router;
