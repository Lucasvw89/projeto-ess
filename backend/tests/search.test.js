const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const search_feature = loadFeature('./tests/features/search.feature');

defineFeature(search_feature, test => {

    // Nesse cenário, filme1 e filme2 são os mesmos em todas as etapas
    // filme é uma palavra contida dentro do nome filme1 e filme2
    test('Busca de filme por nome', ({ given, when, then }) => {

        let search_results;

        given(/^os filmes "(.*)" e "(.*)" estão cadastrados no site$/, (filme1, filme2) => { });

        when(/^o usuário realiza uma requisição por "(.*)"$/, async (filme) => {
            const requisicao = {
                "busca": filme
            };
            search_results = await axios.get('http://localhost:3000/search', {data:requisicao});
        });

        then(/^os posts dos filmes "(.*)" e "(.*)" são retornados pelo servidor$/, (filme1, filme2) => {

            let movie_names = [];
            for (let i = 0; i < search_results.data.length; i++) {
                movie_names.push(search_results.data[i].nome);
            }

            expect(movie_names).toEqual(
                [
                    filme1,
                    filme2
                ]
            );
        });
    });


    test('Busca de filmes por categoria', ({ given, when, then }) => {

        let search_results;

        given(/^a categoria "(.*)" existe e possui filmes categorizados nela$/, (categoria) => { });

        when(/^o usuário realiza uma requisição por "(.*)"$/, async (categoria) => {
            const requisicao = {
                "busca": categoria
            };
            search_results = await axios.get('http://localhost:3000/search', {data:requisicao});
        });

        then(/^os posts dos filmes categorizados em "(.*)" são retornados pelo servidor$/, (categoria) => {

            let movie_genre = [];
            for (let i = 0; i < search_results.data.length; i++) {
                movie_genre.push(search_results.data[i].genero);
            }

            expect(movie_genre).toEqual(
                [
                    categoria
                ],
            );
        });
    });

    test('Busca de filmes por nome falhou', ({ given, when, then}) => {

        let search_results;

        given(/^o filme "(.*)" não esta cadastrado no site$/, (arg0) => {

        });

        when(/^o usuário realiza uma requisição por "(.*)"$/, async (filme) => {
            const requisicao = {
                "busca": filme
            };
            search_results = await axios.get('http://localhost:3000/search', {data:requisicao});
        });

        then('o servidor retorna uma mensagem de erro', () => {
            expect(search_results.data).toEqual(
                []
            );
        });
    });

    test('Busca de filmes por categoria falhou', ({ given, when, then}) => {

        let search_results;

        given(/^a categoria "(.*)" não existe$/, (arg0) => {

        });

        when(/^o usuário realiza uma requisição por "(.*)"$/, async (filme) => {
            const requisicao = {
                "busca": filme
            };
            search_results = await axios.get('http://localhost:3000/search', {data:requisicao});
        });

        then('o servidor retorna uma mensagem de erro', () => {
            expect(search_results.data).toEqual(
                []
            );
        });
    });
});
