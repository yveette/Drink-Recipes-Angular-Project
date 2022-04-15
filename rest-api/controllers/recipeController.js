const { recipeModel, userModel, commentModel } = require('../models');
const { newComment } = require('./commentController');

function getRecipes(req, res, next) {
    const title = req.query.title || '';

    recipeModel.find({ recipeName: { $regex: title, $options: 'i' } })
        .sort({ 'created_at': -1 })
        .populate({
            path: 'userId',
            select: ['email', 'username'],
        })
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getRecipesByLikes(req, res, next) {
    recipeModel.find()
        .sort({ 'likes.length': -1 })
        .limit(3)
        .populate({
            path: 'userId',
            select: ['email', 'username'],
        })
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getRecipesByComments(req, res, next) {
    recipeModel.find()
        .sort({ 'comments.length': -1 })
        .limit(3)
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
        .populate({
            path: 'comments',
            populate: {
                path: 'userId',
                select: ['email', 'username']
            }
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

function getAllLikedRecipesByUser(req, res, next) {
    const { userId } = req.params;

    recipeModel.find({ likes: userId })
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
            Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { recipes: recipe._id } }),
            ]);
            res.status(200).json(recipe);
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

function dislikeRecipe(req, res, next) {
    const recipeId = req.params.recipeId;
    const { _id: userId } = req.user;

    recipeModel.findByIdAndUpdate({ _id: recipeId, userId }, { $pull: { likes: userId } }, { new: true })
        .then(updatedRecipe => {
            res.status(200).json(updatedRecipe);
        })
        .catch(next);
}

function editRecipe(req, res, next) {
    const { recipeId } = req.params;
    const { recipeName, ingredients, description, imgUrl } = req.body;

    recipeModel.findOneAndUpdate({ _id: recipeId }, {
        recipeName, ingredients, description, imgUrl
    }, { runValidators: true, new: true })
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

function deleteRecipe(req, res, next) {
    const { recipeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        recipeModel.findOneAndDelete({ _id: recipeId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { recipes: recipeId } }),
        commentModel.deleteMany({ recipeId: recipeId }),
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
    getRecipesByLikes,
    getRecipesByComments,
    createRecipe,
    likeRecipe,
    dislikeRecipe,
    editRecipe,
    deleteRecipe,
    getCommentsOfRecipe,
    getAllRecipesByUser,
    getAllLikedRecipesByUser
};