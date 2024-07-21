const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const search_feature = loadFeature('./tests/features/search.feature');

defineFeature(search_feature, test => {

    // Nesse cenário, filme1 e filme2 são os mesmos em todas as etapas
    // filme é uma palavra contida dentro do nome filme1 e filme2
    test('Busca de filme por nome', ({ given, and, when, then }) => {

        let search_results;

        given('que o usuário está na página inicial', async () => {

        });

        and(/^os filmes "(.*)" e "(.*)" estão cadastrados no site$/, (filme1, filme2) => {

        });

        when('o usuário seleciona a opção de pesquisa', () => {

        });

        and(/^o usuário escreve "(.*)" e clica no botão "Pesquisar"$/, async (filme) => {
            const requisicao = {
                "busca": filme
            };
            search_results = await axios.get('http://localhost:3000/search', {data:requisicao});
        });

        then(/^os posts dos filmes "(.*)" e "(.*)" são exibidas$/, (filme1, filme2) => {

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
    },


    test('Busca de filmes por categoria', ({ given, and, when, then }) => {

        let search_results;

        given('que o usuário está na página inicial', () => {

        });

        and(/^a categoria "(.*)" está cadastrada e existem filmes categorizados nessa categoria$/, (categoria) => {

        });

        when('o usuário seleciona a opção de pesquisa', () => {

        });

        and(/^o usuário escreve "(.*)" e clica no botão "Pesquisar"$/, async (categoria) => {
            const requisicao = {
                "busca": categoria
            };
            search_results = await axios.get('http://localhost:3000/search', {data:requisicao});
        });

        then(/^Reviews de filmes de "(.*)" são exibidas$/, (categoria) => {

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
    }));

    test('Busca falhou (Serviço)', ({ given, when, then, and }) => {

        let search_results;

        given(/^o filme "(.*)" não esta cadastrado no site$/, (arg0) => {

        });

        when(/^o usuário pesquisa "(.*)"$/, async (filme) => {
            const requisicao = {
                "busca": filme
            };
            search_results = await axios.get('http://localhost:3000/search', {data:requisicao});
        });

        then('o servidor retorna uma mensagem de erro', () => {

        });

        and('uma mensagem informando que não foram encontrados resultados é exibida', () => {
            expect(search_results.data).toEqual(
                []
            );
        });
    });
});
