const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { recipeController, commentController } = require('../controllers');


router.get('/', recipeController.getRecipes);
router.post('/', auth(), recipeController.createRecipe);
router.get('/likes', recipeController.getRecipesByLikes);
router.get('/comments', recipeController.getRecipesByComments);

router.get('/:recipeId', recipeController.getRecipe);
router.post('/:recipeId', auth(), commentController.createComment);
router.put('/:recipeId/like', auth(), recipeController.likeRecipe);
router.put('/:recipeId/dislike', auth(), recipeController.dislikeRecipe);

router.put('/:recipeId/edit', auth(), recipeController.editRecipe);
router.delete('/:recipeId', auth(), recipeController.deleteRecipe);

router.get('/:recipeId/comments', recipeController.getCommentsOfRecipe);
router.post('/:recipeId/comments/:commentId/like', auth(), commentController.likeComment);
router.post('/:recipeId/comments/:commentId/dislike', auth(), commentController.dislikeComment);
// router.put('/:recipeId/comments/:commentId', auth(), commentController.editComment);
// router.delete('/:recipeId/comments/:commentId', auth(), commentController.deleteComment);

module.exports = router;