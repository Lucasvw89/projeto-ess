const movies = require('../db/db');

exports.search = (req, res) => {
  try {

    console.log(req)
    console.log(req.query)

    let { busca } = req.query; // Usando req.query para acessar parâmetros de consulta

    if (!busca) {
      return res.status(400).json({ error: 'Bad request' });
    }

    busca = busca.toLowerCase();

    // Find the movies that match search terms
    const search_results = movies.filter(m =>
      m.nome.toLowerCase().includes(busca) ||
      m.genero.toLowerCase().includes(busca)
    );

    if (search_results.length === 0) {
      return res.status(404).json({ error: 'Nothing matches search terms' });
    }

    res.status(200).json(search_results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

