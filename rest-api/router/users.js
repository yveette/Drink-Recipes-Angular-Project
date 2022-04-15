const express = require('express');
const router = express.Router();
const { authController, recipeController } = require('../controllers');
const { auth } = require('../utils');

router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), authController.editProfileInfo);
router.get('/profile/:userId', auth(), recipeController.getAllRecipesByUser);
router.get('/profile/:userId/liked', auth(), recipeController.getAllLikedRecipesByUser);

module.exports = router;