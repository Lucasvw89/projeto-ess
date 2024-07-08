const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const content_feature = loadFeature('./tests/features/content.feature');


defineFeature(content_feature, (test) => {

    test('Cadastro de Filme com sucesso', ({ given, when, then }) => {

        given('o banco de dados requer os dados obrigatórios nome, gênero, ano, diretor, duracao, sinopse e poster para o cadastro.', () => {

        });

        when(/^o administrador envia uma requisição POST para a rota \/movie com os dados "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" e "(.*)" respectivamente$/, async(nome, genero, ano, diretor, duracao, sinopse, poster) => {
            const movie_data = {
                "poster": poster,
                "nome": nome,
                "ano": ano,
                "duracao": duracao,
                "sinopse": sinopse,
                "diretor": diretor,
                "genero": genero
            }

            const response = await axios.post('http://localhost:3000/movie', movie_data);
            post_status = response.status;
            post_message = response.data;

        });

        then(/^o sistema retorna o status code (\d+) e a resposta deve conter a mensagem "(.*)"$/, (status, message) => {
            expect(post_status).toBe(Number(status));
            expect(post_message).toEqual({message});
        });
    });

    test('Remoção de Filme com Sucesso', ({ given, and, when, then }) => {
        given('o banco de dados requer o ID do filme para a remoção.', () => {

        });

        and(/^o filme "(.*)" está cadastrado no banco de dados com o ID "(.*)"$/,async(nome, id) => {

            const data = {
                filme_id: id
            };

            const response = await axios.get('http://localhost:3000/movie', { data });
            get_status = response.status;
            get_message = response.data;
            expect(get_status).toBe(200);
            expect(get_message).toMatchObject({ "nome": nome, "filme_id": id});
        });

        when(/^o administrador envia uma requisição DELETE para a rota \/movie passando o ID "(.*)"$/, async (id) => {
            const data = {
                filme_id: id
            };

            const response = await axios.delete('http://localhost:3000/movie', { data });
            delete_status = response.status;
            delete_message = response.data;
        });

        then(/^o sistema retorna o status code (\d+) e a resposta deve conter a mensagem "(.*)"$/, (status, message) => {
            expect(delete_status).toBe(Number(status));
            expect(delete_message).toEqual({message});
        });

        and(/^o filme "(.*)" não está mais disponível no banco de dados$/, (arg0) => {

        });
    });
   
    test('Edição das Informações do Filme com sucesso', ({ given, and, when, then }) => {

        filme_id = "";

        given('o banco de dados requer um ou mais dos seguintes dados para a edição: filme_id, nome, ano, duracao, genero, sinopse, poster, plataformas.', () => {

        });

        and(/^o filme "(.*)" de ID "(.*)" está cadastrado no sistema e possui seus campos sinopse e genero como "(.*)" e "(.*)" respectivamente.$/, async(nome, id, sinopse, genero) => {
            filme_id = id;

            const data = {
                filme_id: filme_id
            };

            const response = await axios.get('http://localhost:3000/movie', { data });
            get_status = response.status;
            get_message = response.data;
            expect(get_status).toBe(200);
            expect(get_message).toMatchObject({ "nome": nome, "filme_id": id, "sinopse": sinopse, "genero": genero});            
        });

        when(/^o administrador envia uma requisição PUT para a rota \/movie passando o ID "(.*)" com os campos sinopse e gênero sendo "(.*)" e "(.*)".$/, async(id, sinopse, genero) => {
            const data = {
                filme_id: id,
                sinopse: sinopse,
                genero: genero
            }

            const response = await axios.put('http://localhost:3000/movie', data);
            put_status = response.status;
            put_message = response.data.message;
        });

        then(/^o sistema retorna o status code (\d+) e a mensagem "(.*)"$/, (status, message) => {
            expect(put_status).toBe(Number(status));
            expect(put_message).toEqual(message);
        });

        and(/^Os campos sinopse e genero agora são "(.*)" e "(.*)".$/, async(sinopse, genero) => {
            const data = {
                filme_id: filme_id
            };
            const response = await axios.get('http://localhost:3000/movie', { data });
            get_data = response.data;
            expect(get_status).toBe(200);
            expect(get_data).toMatchObject({"sinopse": sinopse, "genero": genero});   
        });
    }); 
    
    test('Cadastro de Filme que já existe', ({ given, when, and, then }) => {
        movie_data ={}
        given('o banco de dados requer os dados obrigatórios nome, gênero, ano, diretor, duracao, sinopse e poster para o cadastro.', () => {

        });

        when(/^o administrador envia uma requisição POST para a rota \/movie com os dados "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" e "(.*)" respectivamente$/, async(nome, genero, ano, diretor, duracao, sinopse, poster) => {
            const data = {
                "poster": poster,
                "nome": nome,
                "ano": ano,
                "duracao": duracao,
                "sinopse": sinopse,
                "diretor": diretor,
                "genero": genero
            }

            movie_data = data;
 
        });

        then(/^O sistema retorna o status code (\d+) e a mensagem de erro "(.*)".$/, async(status, message) => {
            try{
                const response = await axios.post('http://localhost:3000/movie', movie_data);
            }
            catch (error) {
                expect(error.response.status).toBe(Number(status));
                expect(error.response.data).toEqual({"error": message});
            }
        });
    });

    

    // test('Cadastro de Filme com informações incompletas', ({ given, when, and, then }) => {
    //     given(/^Estou na página "(.*)" e desejo adicionar um filme$/, (arg0) => {
    //     });

    //     when(/^Eu pressiono o botão "(.*)"$/, (arg0) => {
    //     });

    //     and(/^Preencho apenas as informações "(.*)", "(.*)", "(.*)", "(.*)" e "(.*)" com os dados "(.*)", "(.*)", "(.*)", "(.*)" e "(.*)" respectivamente$/, async(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) => {
    //         const content_test = {
    //             "ano": arg5,
    //             "duracao": arg6,
    //             "genero": arg7,
    //             "sinopse": arg8,
    //             "poster": arg9
    //         };
    //         try{
    //             const response = await axios.post('http://localhost:3000/movie', content_test);
    //         }
    //         catch (error) {
    //             expect(error.response.status).toBe(400);
    //             expect(error.response.data).toEqual({
    //                 "error": "O nome não foi preenchido"
    //             });
    //         }
        
    //     });

    //     then(/^Aparece uma mensagem de erro "(.*)" e o usuário permanece na página "(.*)"$/, (arg0, arg1) => {

    //     });
    // });

});


