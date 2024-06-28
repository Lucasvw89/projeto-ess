const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const post_feature = loadFeature('./tests/features/post.feature');

defineFeature(post_feature, test => {
    test('Criar um review.', ({ given, and, then }) => {
        let filme_id;
        let post_id;
        let response;

        given(/^Execute um get na rota "(.*)" armazenando o id do filme "(.*)"$/, async (arg0, arg1) => {
            // Fazendo a requisição GET
            response = await axios.get(arg0);
            // Armazenando o filme_id do filme especificado
            filme_id = response.data.find((filme) => filme.nome === arg1).filme_id;
        });

        and(/^Execute um post na rota "(.*)" com o filme_id no campo filme_id, "(.*)" no campo user_id, "(.*)" no campo nota e "(.*)" no campo review$/, async (arg0, arg1, arg2, arg3) => {
            // Fazendo a requisição POST
            const post_test = {
                "user_id": arg1,
                "filme_id": filme_id, // Usando o filme_id armazenado anteriormente
                "nota": Number(arg2),
                "review": arg3
            };

            response = await axios.post(arg0, post_test);
        });

        and(/^verifique se o status code é (\d+) e armazene o post_id$/, (arg0) => {
            // Verificando se o status code é 201
            expect(response.status).toBe(Number(arg0));
            post_id = response.data.post_id;  // Armazenando o id do post criado
        });

        then(/^Execute um get na rota "(.*)" e verifique se um filme com mesmo post_id existe no filme$/, async (arg0) => {
            // Fazendo a requisição GET
            response = await axios.get('http://localhost:3000/');
            // Busca o filme e o post específicos
            const filme = response.data.find((filme) => filme.filme_id === filme_id);
            const post = filme.posts.find((post) => post.post_id === post_id);
            // Verificando se o post é igual ao post criado
            expect(post).toEqual(expect.objectContaining({ 
                "user_id": "1337",
                "filme_id": filme_id,
                "nota": 5,
                "review": "Filme muito bom",
            }));
        });
    });

    test('Falha criação de review sem nota.', ({ given, when, and, then }) => {
        let filme_id;
        let erro;
    
        given(/^Execute um GET na rota "(.*)" armazenando o id do filme "(.*)".$/, async (arg0, arg1) => {
            const response = await axios.get(arg0);
            filme_id = response.data.find((filme) => filme.nome === arg1).filme_id;
        });
    
        and(/^Execute um POST na rota "(.*)" com o filme_id no campo filme_id, "(.*)" no campo user_id e "(.*)" no campo review, deixando o campo nota vazio.$/, async (arg0, arg1, arg2) => {
            const post_test = {
                user_id: Number(arg1),
                filme_id: filme_id,
                review: arg2,
            };
    
            try {
                const postResponse = await axios.post(arg0, post_test);
            } catch (error) {
                erro = error;
            }
        });
    
        and(/^Verifique se o status code é (\d+) e se a mensagem de erro é "(.*)".$/, (arg0, arg1) => {
            expect(erro.response.status).toBe(Number(arg0));
            expect(erro.response.data).toEqual({
                error: arg1
            });
        });

        then('Verifique se o review com o filme_id não foi criado.', async () => {
            const response = await axios.get('http://localhost:3000/');
            const reviewExists = response.data.some((review) => review.filme_id === filme_id && review.user_id === 1338);
            expect(reviewExists).toBe(false);
        });
    });
    

    test('Atualizar um review.', ({ given, and, when, then }) => {
        let filme_id;
        let post_id;
        let putResponse;

        given(/^Execute um GET na rota "(.*)" armazenando o id do filme "(.*)".$/, async(arg0, arg1) => {
            const response = await axios.get('http://localhost:3000/');
            filme_id = response.data.find((filme) => filme.nome === "Oppenheimer").filme_id;
        });

        and(/^Execute um POST na rota "(.*)" com o filme_id no campo filme_id, "(.*)" no campo user_id, "(.*)" no campo nota e "(.*)" no campo review e armazene o post_id.$/, async (arg0, arg1, arg2, arg3) => {
            const postReview = {
                user_id: 1336,
                filme_id: filme_id,
                nota: 3,
                review: "bom."
            };
            const postResponse = await axios.post('http://localhost:3000/posts', postReview);
            expect(postResponse.status).toBe(201);
            post_id = postResponse.data.post_id;
        });

        when(/^Execute um PUT na rota "(.*)" com "(.*)" no campo review e "(.*)" no campo nota.$/, async (arg0, arg1, arg2) => {
            const putReview = {
                filme_id: filme_id,
                post_id: post_id,
                user_id: 1336,
                review: "Obra-prima cinematográfica",
                nota: 5
            };
            putResponse = await axios.put(arg0, putReview);
        });

        and(/^Verifique se o status code é (\d+).$/, async (arg0) => {
            // This step was already verified in the 'when' step, but we can add another check here if necessary
            expect(putResponse.status).toBe(200);
        });

        then(/^Execute um GET na rota "(.*)" e verifique se o review atualizado possui o texto "(.*)" e a nota "(.*)".$/, async (arg0, arg1, arg2) => {
            const response = await axios.get(arg0);

            // Busca o filme e o post específicos
            const filme = response.data.find((filme) => filme.filme_id === filme_id);
            const post = filme.posts.find((post) => post.post_id === post_id);
            
            expect(post).toEqual(expect.objectContaining({ 
                "user_id": 1336,
                "filme_id": filme_id,
                "nota": Number(arg2),
                "review": arg1,
            }));
        });
    });
    

    test('Criar um review sem a descrição.', ({ given, and, then }) => {
        let filme_id;
        let post_id;
        let response;

        given(/^Execute um get na rota "(.*)" armazenando o id do filme "(.*)"$/, async (arg0, arg1) => {
            // Fazendo a requisição GET
            response = await axios.get(arg0);
            // Armazenando o filme_id do filme especificado
            filme_id = response.data.find((filme) => filme.nome === arg1).filme_id;
        });

        and(/^Execute um post na rota "(.*)" com o filme_id no campo filme_id, "(.*)" no campo user_id e "(.*)" no campo nota.$/, async (arg0, arg1, arg2) => {
            // Fazendo a requisição POST
            const post_test = {
                "user_id": arg1,
                "filme_id": filme_id, // Usando o filme_id armazenado anteriormente
                "nota": Number(arg2)
            };

            response = await axios.post(arg0, post_test);
        });

        and(/^verifique se o status code é (\d+) e armazene o post_id$/, (arg0) => {
            // Verificando se o status code é 201
            expect(response.status).toBe(Number(arg0));
            post_id = response.data.post_id;  // Armazenando o id do post criado
        });

        then(/^Execute um get na rota "(.*)" e verifique se um filme com mesmo post_id existe no filme$/, async (arg0) => {
            // Fazendo a requisição GET
            response = await axios.get('http://localhost:3000/');
            // Busca o filme e o post específicos
            const filme = response.data.find((filme) => filme.filme_id === filme_id);
            const post = filme.posts.find((post) => post.post_id === post_id);
            // Verificando se o post é igual ao post criado
            expect(post).toEqual(expect.objectContaining({ 
                "user_id": "1339",
                "filme_id": filme_id,
                "nota": 2,
            }));
        });
    });

    test('Apagar um review', ({ given, and, when, then }) => {
        let filme_id;
        let post_id;
        let response;
        let user_id

        given(/^Execute um get na rota "(.*)" armazenando o id do filme "(.*)"$/, async (arg0, arg1) => {
            // Fazendo a requisição GET
            response = await axios.get(arg0);
            // Armazenando o filme_id do filme especificado
            filme_id = response.data.find((filme) => filme.nome === arg1).filme_id;
        });

        and(/^Execute um post na rota "(.*)" com o filme_id no campo filme_id, "(.*)" no campo user_id, "(.*)" no campo nota e "(.*)" no campo review$/, async (arg0, arg1, arg2, arg3) => {
            user_id = Number(arg1);
            // Fazendo a requisição POST
            const post_test = {
                "user_id": Number(arg1),
                "filme_id": filme_id, // Usando o filme_id armazenado anteriormente
                "nota": Number(arg2),
                "review": arg3
            };

            response = await axios.post(arg0, post_test);
            post_id = response.data.post_id;  // Armazenando o id do post criado
        });

        when(/^Executa um DELETE na rota "(.*)" para apagar o review criado.$/, async (arg0) => {
            const post_test = {
                "post_id": post_id,
                "user_id": Number(user_id),
                "filme_id": filme_id // Usando o filme_id armazenado anteriormente
            };
            
            response = await axios.delete(arg0, {data: post_test});
        });

        and(/^Verifica se o status da resposta do DELETE é (\d+) \(indicando remoção bem-sucedida\).$/, (arg0) => {
            // Verificando se o status code é 201
            expect(response.status).toBe(Number(arg0));
        });

        then(/^Executa um GET na rota "(.*)" para verificar se o review foi apagado.$/, async (arg0) => {
            // Fazendo a requisição GET
            response = await axios.get(arg0);
            // Busca o filme e o post específicos
            const filme = response.data.find((filme) => filme.filme_id === filme_id);
            const post = filme.posts.find((post) => post.post_id === post_id);
            // Verificando se o post é igual ao post criado
            expect(post).toBe(undefined);
        });
    });
});
