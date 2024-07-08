const Movie = require('../models/movies');
const movies = require('../db/db');
const { v5: uuidv5 } = require('uuid');

const MY_NAMESPACE = 'd7b4380e-75f9-4b83-a67b-867540268a50';


exports.getMovie = (req, res) => {
  try {
    const { filme_id } = req.body;
    
    const movieIndex = movies.findIndex(movie => movie.filme_id === filme_id);

    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    const movie = movies[movieIndex];
    res.status(200).json( movie );
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao remover o filme' });
  }
};

exports.addMovie = (req, res) => {
  try {
    const { poster, nome, ano, duracao, sinopse, diretor, genero } = req.body;
    //Ainda existe algum problema com esse iiud5 que não sei o que é 
      key = nome+ano+duracao+genero
      filme_id = uuidv5(key, MY_NAMESPACE);
      
    const existingID = movies.find(movie => movie.filme_id === filme_id);

    if (existingID) {
      return res.status(409).json({ error: 'Filme já cadastrado no sistema' });
    }



    if (!poster) {
      return res.status(400).json({ error: 'O poster não foi adicionado', error: "Campos não preenchidos" });
    }
    if (!nome) {
      return res.status(400).json({ error: 'O campo nome não foi preenchido', error: "Campos não preenchidos" });
    }
    if (!ano) {
      return res.status(400).json({ error: 'O campo ano não foi preenchido', error: "Campos não preenchidos" });
    }
    if (!duracao) {
      return res.status(400).json({ error: 'O campo duração não foi preenchido', error: "Campos não preenchidos" });
    }
    if (!sinopse) {
      return res.status(400).json({ error: 'O campo sinopse não foi preenchido', error: "Campos não preenchidos" });
    }
    if (!diretor) {
      return res.status(400).json({ error: 'O campo diretor não foi preenchido', error: "Campos não preenchidos" });
    }
    if (!genero) {
      return res.status(400).json({ error: 'O campo genero não foi preenchido', error: "Campos não preenchidos" });
    }

    
    const newMovie = new Movie(filme_id, poster, nome, ano, duracao, sinopse, diretor, genero);

    movies.push(newMovie);
    res.status(201).json({ message: 'Filme Adicionado com Sucesso'});
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao adicionar o filme' });
  }
};


exports.delMovie = (req, res) => {
  try {
    const { filme_id } = req.body;
    
    const movieIndex = movies.findIndex(movie => movie.filme_id === filme_id);

    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    movies.splice(movieIndex, 1);
    
    res.status(200).json({ message: 'Filme Removido com Sucesso' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao remover o filme' });
  }
};

exports.editMovie = (req, res) => {
  try {
    const { filme_id, poster, nome, ano, duracao, sinopse, diretor, genero, plataformas } = req.body;

    const movieIndex = movies.findIndex(movie => movie.filme_id === filme_id);

    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    if (!poster && !nome && !ano && !duracao && !sinopse && !diretor && !genero && !plataformas) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    if (poster) movies[movieIndex].poster = poster;
    if (nome) movies[movieIndex].nome = nome;
    if (ano) movies[movieIndex].ano = ano;
    if (duracao) movies[movieIndex].duracao = duracao;
    if (sinopse) movies[movieIndex].sinopse = sinopse;
    if (diretor) movies[movieIndex].diretor = diretor;
    if (genero) movies[movieIndex].genero = genero;
    if (plataformas) movies[movieIndex].plataformas = plataformas;

    res.status(200).json({
      message: "Filme Editado com Sucesso",
      movie: movies[movieIndex]
    });
    
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao editar o filme' });
  }
};