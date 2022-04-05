const { recipeModel, userModel, commentModel } = require('../models');
const { newComment } = require('./commentController');

function getRecipes(req, res, next) {
    recipeModel.find()
        .populate({
            path: 'userId',
            select: ['email', 'username'],
        })
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getRecipe(req, res, next) {
    const { recipeId } = req.params;

    recipeModel.findById(recipeId)
        .populate({
            path: 'userId',
            select: ['email', 'username'],
        })
        .then(recipe => res.json(recipe))
        .catch(next);
}

function getAllRecipesByUser(req, res, next) {
    const { userId } = req.params;

    recipeModel.find({ userId })
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getCommentsOfRecipe(req, res, next) {
    const { recipeId } = req.params;

    recipeModel.find(recipeId)
        .populate({
            path: 'comments',
            select: ['likes', 'text', 'userId', 'created_at'],
            populate: { path: 'userId', select: 'username' }
        })
        .then(recipe => res.json(recipe))
        .catch(next);
}

function createRecipe(req, res, next) {
    const { recipeName, ingredients, description, imgUrl, commentText } = req.body;
    const { _id: userId } = req.user;

    recipeModel.create({ recipeName, ingredients, description, imgUrl, userId, likes: [] })
        .then(recipe => {
            newComment(commentText, userId, recipe._id)
                .then(([_, updatedRecipe]) => res.status(200).json(updatedRecipe));
            Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { recipes: recipe._id } }),
            ]);
        })
        .catch(next);
}

function likeRecipe(req, res, next) {
    const recipeId = req.params.recipeId;
    const { _id: userId } = req.user;
    recipeModel.findByIdAndUpdate({ _id: recipeId, userId }, { $addToSet: { likes: userId } }, { new: true })
        .then(updatedRecipe => {
            res.status(200).json(updatedRecipe);
        })
        .catch(next);
}

//TODO: improve edit
function editRecipe(req, res, next) {
    const { recipeId } = req.params;
    const { recipe } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    recipeModel.findOneAndUpdate({ _id: recipeId, userId }, { text: recipe }, { new: true })
        .then(updatedRecipe => {
            if (updatedRecipe) {
                res.status(200).json(updatedRecipe);
            }
            else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

//TODO: improve delete
function deleteRecipe(req, res, next) {
    const { recipeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        recipeModel.findOneAndDelete({ _id: recipeId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { recipes: recipeId } }),
        commentModel.deleteMany({ _id: recipeId }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    likeRecipe,
    editRecipe,
    deleteRecipe,
    getCommentsOfRecipe,
    getAllRecipesByUser
};