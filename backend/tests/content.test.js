const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const content_feature = loadFeature('./tests/features/content.feature');


defineFeature(content_feature, (test) => {

    test('Cadastro de Filme com sucesso', ({ given, when, then }) => {
        var post_status;

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
            const post_status = response.status;
            const post_message = response.data;

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
            const get_status = response.status;
            const get_message = response.data;
            expect(get_status).toBe(200);
            expect(get_message).toMatchObject({ "nome": nome, "filme_id": id});
        });

        when(/^o administrador envia uma requisição DELETE para a rota \/movie passando o ID "(.*)"$/, async (id) => {
            const data = {
                filme_id: id
            };

            const response = await axios.delete('http://localhost:3000/movie', { data });
            const delete_status = response.status;
            const delete_message = response.data;
        });

        then(/^o sistema retorna o status code (\d+) e a resposta deve conter a mensagem "(.*)"$/, (status, message) => {
            expect(delete_status).toBe(Number(status));
            expect(delete_message).toEqual({message});
        });

        and(/^o filme "(.*)" não está mais disponível no banco de dados$/, (arg0) => {

        });
    });
   
    
 

    // test('Remoção de Filme', ({ given, and, when, then }) => {
    //     given(/^Estou na página "(.*)"$/, (arg0) => {
    //     });

    //     and(/^Desejo remover o filme "(.*)" que está cadastrado no sistema com os dados "(.*)", "(.*)", "(.*)", "(.*)" e "(.*)"$/, async(arg0, arg1, arg2, arg3, arg4, arg5) => {
    //         const content_test = {
    //             "nome": arg0,
    //             "ano": arg1,
    //             "duracao": arg2,
    //             "genero": arg3,
    //             "sinopse": arg4,
    //             "poster": arg5
    //         };
    
    //         const response = await axios.post('http://localhost:3000/movie', content_test);
    //         filme_id = response.data.filme_id;
    //     });

    //     when(/^Eu clico no componente "(.*)"$/, (arg0) => {
    //     });

    //     and(/^Escolho a opção "(.*)" e clico "(.*)" na tela de confirmar exclusão$/, async(arg0, arg1) => {

    //         const data = {
    //             filme_id: filme_id
    //         };
    //         await axios.delete('http://localhost:3000/movie', { data });
    //     });

    //     then(/^O filme é removido com sucesso da página "(.*)"$/, async(arg0) => {
    //         const response = await axios.get('http://localhost:3000');
    //         const filme = response.data.find(filme => filme.filme_id === filme_id);
    //         expect(filme).toBeUndefined();
    //     });
    // });

    // test('Edição das informações do filme', ({ given, and, when, then }) => {

    //     given(/^Estou na página "(.*)" e esejo editar as informações do filme "(.*)" que está cadastrado no sistema$/, async(arg0, arg1) => {
    //         const response = await axios.get('http://localhost:3000/');
    //         filme_id = response.data.find((filme) => filme.nome === arg1).filme_id;
    //     });
        
    //     and(/^Ele possui os campos "(.*)" e "(.*)" com os valores "(.*)" e "(.*)" respectivamente$/, async(arg0, arg1, arg2, arg3) => {
    //         const response = await axios.get('http://localhost:3000/');
    //         filme_genero = response.data.find((filme) => filme.filme_id === filme_id).genero;
    //         filme_sinopse = response.data.find((filme) => filme.filme_id === filme_id).sinopse;
        
    //         expect(filme_genero).toEqual('Comédia', `Expected genero to be "Comédia" but got "${filme_genero}"`);
    //         expect(filme_sinopse).toEqual('Placeholder', `Expected sinopse to be "Placeholder" but got "${filme_sinopse}"`);
    //     });
    
    //     when(/^Eu clico no componente "(.*)" e escolho a opção "(.*)"$/, (arg0, arg1) => {
    //     });
    
    //     and(/^Modifico as informações do campo "(.*)" e "(.*)" para "(.*)" e "(.*)" respectivamente$/, async(arg0, arg1, arg2, arg3) => {
    //         const content_test = {
    //             "filme_id": filme_id,
    //             "sinopse": arg3,
    //             "genero": arg2
    //         };
    //         await axios.put("http://localhost:3000/movie", content_test);
    //     });
    
    //     then(/^A informação é editada com sucesso e o usuário retorna para a página "(.*)"$/, async(arg0) => {
    //         const response = await axios.get('http://localhost:3000/');
    //         const filme = response.data.find(filme => filme.filme_id === filme_id);
    //         expect(filme).toEqual(expect.objectContaining({ 
    //             "sinopse": "Mil novecentos e oitenta e quatro é um romance distópico do escritor inglês George Orwell. parte para o mundo humano em busca da verdadeira felicidade.",
    //             "genero": "Romance"
    //         }));
    //     });
    // });

    // test('Cadastro de Filme que já existe', ({ given, when, and, then }) => {
    //     given(/^Estou na página "(.*)" e quero adicionar o filme "(.*)"$/, (arg0, arg1) => {
    //     });
    //     when(/^Eu pressiono o botão "(.*)"$/, (arg0) => {
    //     });
    //     and(/^Preencho as informações "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" e "(.*)" com os dados "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" e "(.*)" respectivamente$/, async(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) => {
    //         const content_test = {
    //             "nome": arg6,
    //             "ano": arg7,
    //             "duracao": arg8,
    //             "genero": arg9,
    //             "sinopse": arg10,
    //             "poster": arg11
    //         };
    //         try {
    //             const response = await axios.post('http://localhost:3000/movie', content_test);
    //         } catch (error) {
    //             expect(error.response.status).toBe(409);
    //             expect(error.response.data).toEqual({
    //                 "error": "Um filme com esse nome ou poster já existe"
    //              });
    //         }
    //     });

    //     and(/^O filme "(.*)" já estava cadastrado$/, (arg0) => {
    //     });

    //     then(/^Aparece uma mensagem de erro "(.*)"$/, (arg0) => {
    //     });
    // });

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


