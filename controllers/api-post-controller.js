const Post = require('../models/post');

const handleError = (res, error) => {
  res.status(500).send(error.message);
}

// Get All Posts
const getPosts = (req, res) => {
  Post
    .find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => handleError(res, error));
}
// Add New Post
const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
}
// Get Post by ID
const getPost = (req, res) => {
  Post
    .findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
}
// Delete Post by ID
const deletePost = (req, res) => {
  const { id } = req.params;
  Post
  .findByIdAndDelete(id)
  .then((post) => res.status(200).json(id))
  .catch((error) => handleError(res, error));
}
// Update Post by ID
const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(id, { title, author, text }, {new : true}) // findByIdAndUpdate по умолчанию возвращает старое значение; {new : true} - используется для возврата актуального значения
    .then((post) => res.json(post))
    .catch((error) => handleError(res, error));
}

module.exports = {
  getPosts,
  addPost,
  getPost, 
  deletePost,
  editPost,
};
