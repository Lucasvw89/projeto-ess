const Page = require('../models/page');
const movies = require('../db/db')

exports.showpage = (req, res) => {
    try {
        // Recupere o filme_id dos parâmetros da URL
        const { filme_id } = req.params;

        // Encontre o filme pelo filme_id
        const movie = movies.find(m => m.filme_id === filme_id);
        if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
        }

        // Atualize as informações da página com base no filme encontrado
        const newPage = new Page(movie.filme_id, movie.nome, movie.poster, movie.sinopse, movie.diretor, movie.ano, movie.genero, movie.duracao, movie.posts);

        res.status(201).json(newPage);
        return newPage;
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
