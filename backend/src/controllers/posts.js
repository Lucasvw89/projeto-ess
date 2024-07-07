const Post = require("../models/post");
const movies = require("../db/db");

const validateNota = (nota) => {
  if (nota === undefined || nota === 0 || nota === null) {
    throw new Error("Nota is required.");
  }
};

exports.createPost = (req, res) => {
  try {
    const { user_id, filme_id, nota, review } = req.body;
    validateNota(nota);

    const newPost = new Post(user_id, filme_id, nota, review);
    if (!newPost.validateNota()) {
      return res.status(400).json({ error: "Nota must be between 0 and 5." });
    }

    // Find the movie by filme_id
    const movie = movies.find((m) => m.filme_id === filme_id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Add the new post to the movie's posts array
    movie.posts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = (req, res) => {
  try {
    const { post_id, user_id, filme_id } = req.body;

    // Find the movie by filme_id
    const movie = movies.find((m) => m.filme_id === filme_id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Find the post by post_id and user_id
    const index = movie.posts.findIndex(
      (post) => post.post_id === post_id && post.user_id === user_id
    );
    if (index === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Remove the post from the movie's posts array
    movie.posts.splice(index, 1);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = (req, res) => {
  try {
    const { post_id, user_id, filme_id, nota, review } = req.body;

    validateNota(nota);

    // Find the movie by filme_id
    const movie = movies.find((m) => m.filme_id === filme_id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Find the post by post_id and user_id
    const post = movie.posts.find(
      (post) => post.post_id === post_id && post.user_id === user_id
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the post with the new data
    post.nota = nota;
    post.review = review;

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
