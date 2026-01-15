const express = require('express');
const router  = express.Router();
const {loginUser,registerUser,forgotPassword,resetPassword} = require('../controllers/authController');

router.post('/auth/login',loginUser);
router.post('/auth/register',registerUser);
router.post('/auth/forgot-password', forgotPassword);
router.put('/auth/reset-password/:resetToken', resetPassword);

module.exports = router;
