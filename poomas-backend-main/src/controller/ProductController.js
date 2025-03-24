const Product = require('../models/Product');


const s3 = require('../config/s3'); // Adjust the path to your s3.js file
const multer = require('multer');
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '_' + file.originalname);
    },
  }),
});

exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    // If a category is provided in the query, filter products by that category
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      Price,
      location,
      category,
      features
    } = req.body;

    const createdBy = req.user.userId;

    const product = new Product({
      name,
      description,
      Price,
      location,
      category,
      features,
      createdBy
    });

    // Check if images and videos are present in the request
    if (req.files && req.files.images) {
      // Map the uploaded images to their S3 URLs
      const imageUrls = req.files.images.map(image => image.location);
      product.images = imageUrls;
    }

    if (req.files && req.files.videos) {
      // Map the uploaded videos to their S3 URLs
      const videoUrls = req.files.videos.map(video => video.location);
      product.videos = videoUrls;
    }

    await product.save();
    res.status(201).json({
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      message: 'Failed to add product'
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Find the product by id and update its fields
    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    // Find the product by ID and delete it
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};



// Controller function for searching products
exports.searchProducts = async (req, res) => {
  try {
    console.log("Received Query Params:", req.query);
    let { category } = req.query;  // Change 'query' to 'category'

    // Ensure category is a valid string
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ message: 'Invalid search query' });
    }

    // Perform case-insensitive search by category
    const searchResults = await Product.find({
      category: { $regex: category.trim(), $options: 'i' }
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getFilterOptions = async (req, res) => {
  try {
    const filterOptions = {};
    
    // Fetch unique values for each product feature
    const uniqueCategories = await Product.distinct('category');
    filterOptions.category = uniqueCategories;

    const uniqueLocations = await Product.distinct('location');
    filterOptions.location = uniqueLocations;

    const uniqueFuelTypes = await Product.distinct('features.fuelType');
    filterOptions.fuelType = uniqueFuelTypes;

    // Add more features as needed

    res.status(200).json({ filterOptions });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


