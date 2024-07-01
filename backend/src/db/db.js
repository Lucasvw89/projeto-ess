const { v1: uuidv1, v4: uuidv4 } = require('uuid');

const filme1_id = uuidv1();
const filme2_id = uuidv1();

module.exports = [
    {
      filme_id: filme1_id,
      poster: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
      nome: "Oppenheimer",
      ano: 2023,
      duracao: 181,
      sinopse: "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.",
      diretor: "Christopher Nolan",
      plataformas: [
      {
          filme1_id: filme1_id,
          nome: "Globoplay",
          url: "https://globoplay.com/oppenheimer",
          image: "https://globoplay.com/logo.png",
      },
      {
          filme1_id: filme1_id,
          nome: "Netflix",
          url: "https://netflix.com/oppenheimer",
          image: "https://netflix.com/logo.png",
      }
      ],
      genero: "comedia",
      posts: [
        {
          post_id: uuidv4(),
          user_id: "Elian Rodriguez",
          filme_id: filme1_id,
          nota: 0.5,
          review: "Horrivel!",
          comments: []
        },
        {
          post_id: uuidv4(),
          user_id: "Yumi Kinoshita",
          filme_id: filme1_id,
          nota: 5,
          review: "Absolute Cinema!",
          comments: []
        },
      ]
    },
    {
      filme_id: filme2_id,
      poster: "https://example.com/poster2.jpg",
      nome: "Movie 2",
      ano: 2021,
      duracao: 130,
      sinopse: "Synopsis of movie 2",
      diretor: "Director 2",
      plataformas: [],
      genero: "comedia",
      posts: []
    },
    {
      filme_id: "d9a92df2-2d0e-11ef-85cc-15bfccf04c98",
      poster: "https://example.com/poster3.jpg",
      nome: "Os Vingadores",
      ano: 2021,
      duracao: 130,
      sinopse: "Synopsis of movie 3",
      diretor: "Director 3",
      plataformas: [],
      genero: "Ação",
      posts: []
    },
    {
      filme_id: "d9a92df3-2d0e-11ef-85cc-15bfccf04c99",
      poster: "https://example.com/poster4.jpg",
      nome: "Vingadores Ultimato",
      ano: 2021,
      duracao: 130,
      sinopse: "Synopsis of movie 4",
      diretor: "Director 4",
      plataformas: [],
      genero: "comedia",
      posts: []
    },
    {
      filme_id: "d9a92df3-2d0e-11ef-85cc-15bfccf04c00",
      poster: "https://example.com/poster5.jpg",
      nome: "A era do gelo",
      ano: 2021,
      duracao: 130,
      sinopse: "Synopsis of movie 5",
      diretor: "Director 5",
      plataformas: [],
      genero: "comedia",
      posts: []
    },
    {
      filme_id: 40028922,
      poster: "https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
      nome: "1984",
      ano: 1984,
      duracao: "1h33",
      sinopse: "Placeholder",
      genero: "Comédia",
    },
    {
      filme_id: "12345678",
       nome: "Barbie2",
       ano: 2023, 
       duracao: "1h54m",
       genero: "2",
       sinopse: "Barbie parte para o mundo humano em busca da verdadeira felicidade.",
       poster: "https://image.tmdb.org/t/p/original/uUbdc9TMwbazp1zCNzGtXoBHhUa.jpg" 
    }
  ];
  
