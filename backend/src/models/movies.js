class Movie {
    constructor(filme_id, poster, nome, ano, duracao, sinopse, diretor, genero) {
        this.filme_id = filme_id
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
