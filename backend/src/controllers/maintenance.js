const Post = require('../models/post');
const movies = require('../db/db');

exports.putEditR = (req, res) => {
    try {
        const { post_id, nota, review } = req.body;

        // Verificar se o post_id está presente no corpo da requisição
        if (!post_id) {
            return res.status(400).json({ error: 'post_id is required' });
        }

        // Encontrar o post pelo post_id
        const movie = movies.find(m => m.posts.some(post => post.post_id === post_id));
        if (!movie) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Encontrar o post específico pelo post_id
        const post = movie.posts.find(post => post.post_id === post_id);
        
        // Atualizar apenas nota e review (e outras propriedades que deseja permitir)
        if (nota !== undefined) {
            post.nota = nota;
        }
        if (review !== undefined) {
            post.review = review;
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  exports.deleteR = (req, res) => {
    try {
      const { post_id, user_id, filme_id, review } = req.body;

      // Find the movie by filme_id
      const movie = movies.find(m => m.filme_id === filme_id);
      if (!movie) {

        return res.status(404).json({ error: 'Movie not found' });
      }
  
      // Find the post by post_id and user_id
      const index = movie.posts.findIndex(post => post.post_id === post_id);
      if (index === -1) {

        return res.status(404).json({ error: 'Post not found' });
      }
      //movie.posts.splice(index, 1);
      movie.posts[index].review = "";

      res.status(200).json({ message: 'Review post deleted successfully' });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

/*exports.deleteR = (req, res) => {
  
  const {id} = request.params;
  const index = movie.posts.findIndex(post => post.post_id === post_id);

  index.posts.review.splice(index, 1);

  return res.status(200).send();

};
/*
exports.deleteR = ('controllers/edition_reviews/:id', req, res) => {
  const id  = req.params.id * 1; // Corrected request to req
  const index = movies.posts.findIndex(post => post.post_id === id); // Corrected post_id to id

  if (index !== -1) {
    movies.posts.splice(index, 1); // Removed the nested 'posts.review' as it was incorrect
    return res.status(200).send();
  } else {
    return res.status(404).send('Post not found');
  }
};*/

