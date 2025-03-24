const { route } = require('.');
const authController = require('../controller/authController');
const express = require('express');

const router = express.Router();


router.post('/signup/', authController.userSignup);
router.post('/login/', authController.userLogin);



module.exports = router;