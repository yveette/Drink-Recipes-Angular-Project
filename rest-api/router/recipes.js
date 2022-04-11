const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { recipeController, commentController } = require('../controllers');


router.get('/', recipeController.getRecipes);
router.post('/', auth(), recipeController.createRecipe);

router.get('/:recipeId', recipeController.getRecipe);
router.post('/:recipeId', auth(), commentController.createComment);
router.put('/:recipeId', auth(), recipeController.likeRecipe);

//TODO:
// router.put('/:recipeId', auth(), recipeController.editRecipe);
router.delete('/:recipeId', auth(), recipeController.deleteRecipe);

router.get('/:recipeId/comments', recipeController.getCommentsOfRecipe);
router.put('/:recipeId/comments/:commentId', auth(), commentController.editComment);
router.delete('/:recipeId/comments/:commentId', auth(), commentController.deleteComment);

module.exports = router;