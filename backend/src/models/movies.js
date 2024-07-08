const { v4: uuidv4 } = require('uuid');

class Movie {
    constructor(poster, nome, ano, duracao, sinopse, diretor, genero) {
        this.filme_id = uuidv4();
        this.poster = poster;
        this.nome = nome;
        this.ano = ano;
        this.duracao = duracao;
        this.sinopse = sinopse;
        this.genero = genero;
        this.diretor = diretor;
        this.plataformas = [];
        this.posts = [];
    }
}

module.exports = Movie;
