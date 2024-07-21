const{ defineFeature, loadFeature } = require('jest-cucumber');
const axios = require("axios");
const maintenance_feature = loadFeature("./tests/features/maintenance.feature");

defineFeature(maintenance_feature, test =>{
    //Feature "Salvar edição de review"
    test('Salvar edição de review', ({ given, and, when, then }) => {
        let filme;
        let post_id;
        let user_id;
        let nota;
        let response;
        let review;
        let post_test;
        let post_final;

        given(/^Estou no post "(.*)" que já existe no sistema$/, async (arg0) => {
            //requisição do GET
            response = await axios.get("http://localhost:3000/");
            //armazenando filme_id
            filme = response.data.find((filme)=>filme.nome === arg0);
        });

        and(/^Existe uma review do usuario "(.*)" com texto "(.*)"$/, async (arg0, arg1) => {
            let user_id = null;
            review = null;
            // Iterando sobre todos os posts de cada filme
            for (let post of filme.posts) {
                // Verificando se o post corresponde ao user_id e à review fornecidos
                if (post.user_id === Number(arg0) && post.review === arg1) {
                    user_id = post.user_id;
                    review = post.review;
                    nota = post.nota;
                    post_id = post.post_id
                    break; // Saindo do loop assim que encontramos a correspondência
                }
            }
        });

        and(/^selecionei a opção "(.*)"$/, (arg0) => {

        });

        when(/^Eu editar a review para que ela fique "(.*)"$/, async (arg0) => {
            post_test = {
                "post_id": post_id,
                "nota": nota,
                "review": arg0
            }; 
        });
        
        and(/^Selecionar a opção "(.*)"$/, async (arg0) => {
            post_final = await axios.put("http://localhost:3000/maintenance", post_test);
            post_id = response.data.post_id;
        });

        then(/^Serei redirecionado a "(.*)"$/, (arg0) => {

        });

        and(/^A review do usuario "(.*)" no post "(.*)" terá a review "(.*)"$/, async (arg0, arg1, arg2) => {
            //requisição do GET
            const response = await axios.get("http://localhost:3000/");
            //armazenando filme_id
            filme = response.data.find((filme)=>filme.nome === arg1);
            let post_test;
            for (let post of filme.posts) {
                // Verificando se o post corresponde ao user_id e à review fornecidos
                if (post.user_id === Number(arg0) && post.review === arg2) {
                    post_test = post;
                    break; // Saindo do loop assim que encontramos a correspondência
                }
            }
            expect(post_final.data).toEqual(post_test);
        });
    });      

    test('Remover review', ({ given, and, when, then }) => {
        let filme;
        let post_id;
        let user_id;
        let nota;
        let response;
        let review;
        let post_test;
        let post_final;

        given(/^Estou no post "(.*)" que já existe no sistema$/, async (arg0) => {
            //requisição do GET
            response = await axios.get("http://localhost:3000/");
            //armazenando filme_id
            filme = response.data.find((filme)=>filme.nome === arg0);
        });

        and(/^Existe uma review do usuario "(.*)" com texto "(.*)"$/, async (arg0, arg1) => {
            let user_id = null;
            review = null;
            // Iterando sobre todos os posts de cada filme
            for (let post of filme.posts) {
                // Verificando se o post corresponde ao user_id e à review fornecidos
                if (post.user_id === Number(arg0) && post.review === arg1) {
                    user_id = post.user_id;
                    review = post.review;
                    nota = post.nota;
                    post_id = post.post_id
                    break; // Saindo do loop assim que encontramos a correspondência
                }
            }
        });

        when(/^Eu selecionar a opção "(.*)" a review do usuario "(.*)"$/, async (arg0, arg1) => {
            post_test = {
                "post_id": post_id,
                "user_id": arg1,
                "filme_id": filme.filme_id,
                "review": " "
            };
            post_final = await axios.delete("http://localhost:3000/maintenance", {data:post_test});
            post_id = response.data.post_id;
            
        });

        then(/^A review do usuario "(.*)" no post "(.*)" estará em branco "(.*)"$/, async (arg0, arg1, arg2) => {
            //requisição do GET
            const response = await axios.get("http://localhost:3000/");
            //armazenando filme_id
            filme = response.data.find((filme)=>filme.nome === arg1);
            let post_test;
            for (let post of filme.posts) {
                // Verificando se o post corresponde ao user_id e à review fornecidos
                if (post.user_id === Number(arg0) && post.review === arg2) {
                    post_test = post;
                    break; // Saindo do loop assim que encontramos a correspondência
                }
            }
            expect(post_final.data.message).toEqual("Review post deleted successfully");
        });
    });      

    test('Falha na edição', ({ given, and, when, then }) => {
        let filme;
        let post_id;
        let user_id;
        let nota;
        let response;
        let review;
        let post_test;
        let post_final;

        given(/^Estou no post "(.*)" que já existe no sistema$/, async (arg0) => {
            //requisição do GET
            response = await axios.get("http://localhost:3000/");
            //armazenando filme_id
            filme = response.data.find((filme)=>filme.nome === arg0);
        });

        and(/^Existe uma review do usuario "(.*)" com texto "(.*)"$/, async (arg0, arg1) => {
            let user_id = null;
            review = null;
            // Iterando sobre todos os posts de cada filme
            for (let post of filme.posts) {
                // Verificando se o post corresponde ao user_id e à review fornecidos
                if (post.user_id === Number(arg0) && post.review === arg1) {
                    user_id = post.user_id;
                    review = post.review;
                    nota = post.nota;
                    post_id = post.post_id
                    post_final = post;
                    break; // Saindo do loop assim que encontramos a correspondência
                }
            }
        });

        and(/^selecionei a opção "(.*)"$/, (arg0) => {

        });

        when(/^Eu editar a review para que ela fique "(.*)"$/, async (arg0) => {
            post_test = {
                "post_id": post_id,
                "nota": nota,
                "review": arg0
            };
        });
        
        and(/^Selecionar a opção "(.*)"$/, async (arg0) => {
        });

        then(/^Serei redirecionado a "(.*)"$/, (arg0) => {

        });

        and(/^A review do usuario "(.*)" no post "(.*)" terá a review "(.*)"$/, async (arg0, arg1, arg2) => {
            //requisição do GET
            const response = await axios.get("http://localhost:3000/");
            filme = response.data.find((filme)=>filme.nome === arg1);
            let post_test;
            for (let post of filme.posts) {
                // Verificando se o post corresponde ao user_id e à review fornecidos
                if (post.user_id === Number(arg0) && post.review === arg2) {
                    post_test = post;
                    break; // Saindo do loop assim que encontramos a correspondência
                }
            }
            expect(post_final).toEqual(post_test);
        });
    });      

    // //Feature "Falha na edição"    
    
    // test('Falha na edição', ({ given, and, when, then }) => {
    //     given(/^Estou no post "(.*)" que já existe no sistema$/, (arg0) => {

    //     });

    //     and(/^existe uma review do usuario "(.*)"$/, (arg0) => {

    //     });

    //     and(/^selecionei a opção "(.*)"$/, (arg0) => {

    //     });

    //     when(/^Eu editar o post adicionando a palavra "(.*)" ao texto "(.*)"$/, (arg0, arg1) => {

    //     });

    //     and('Fechar a página de edição', () => {

    //     });

    //     then(/^Serei redirecionado a "(.*)"$/, (arg0) => {

    //     });

    //     and(/^O post "(.*)" não terá a palavra "(.*)" no texto "(.*)" na review do usuario "(.*)"$/, (arg0, arg1, arg2, arg3) => {     

    //     });
    // });

    // //Feature "Entrar na edição review"

    // test('Entrar na edição review', ({ given, and, when, then }) => {
    //     given(/^Estou no post "(.*)" que já existe no sistema$/, (arg0) => {

    //     });

    //     and(/^Existe uma review do usuario "(.*)" no post$/, (arg0) => {

    //     });

    //     when(/^Eu selecionar a opção "(.*)"$/, (arg0) => {

    //     });

    //     then(/^Irei ter acesso a edição da review do usuario "(.*)"$/, (arg0) => {

    //     });

    //     and(/^Terá as opções "(.*)" e "(.*)"$/, (arg0, arg1) => {

    //     });
    // });
    
});
