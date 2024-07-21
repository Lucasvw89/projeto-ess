const { defineFeature, loadFeature } = require('jest-cucumber');
const axios = require('axios');
const comment_feature = loadFeature('./tests/features/comment.feature');

function findCommentById(comments, commentId, user_id) {

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (comment.comment_id === commentId) {
            return comment;
        } else if (comment.comments.length > 0) {
            const foundComment = findCommentById(comment.comments, commentId, user_id);
            if (foundComment) {
                return foundComment;
            }
        }
    }
    return null; // Retorna null se não encontrar o comentário
}

// Função de busca de comentários em reviews
function findById(movies, id, user_id = Infinity) {
    if (id.length == 35) {
        // Procurar em comentários
            for (const filme of movies) {
                if (filme.posts){
                    for (const post of filme.posts) {
                        const foundComment = findCommentById(post.comments, id, user_id);
                        if (foundComment) {
                            return foundComment;
                        }
                    }
                }
            }
    } else {
        // Procurar em posts
        for (const filme of movies) {
            for (let i = 0; i < filme.posts.length; i++) {
                const post = filme.posts[i];
                if (post.post_id === id) {
                    return post;
                }
            }
        }
    }
    return null; // Retorna null se não encontrar o post ou comentário
}


defineFeature(comment_feature, test => {
    test('Criar um comentário', ({ given, when, and, then }) => {
        let filme_data;
        let post_id;
        let comment_test;

        given(/^Eu Estou na página do filme "(.*)"$/, async (arg0) => {
            // Fazendo a requisição GET
            const response = await axios.get('http://localhost:3000/');
            // Armazenando o filme_id do filme especificado
            filme_data = response.data.find((filme) => filme.nome === arg0);
        });

        and(/^aperto no botão "(.*)" do primeiro "(.*)" review$/, (arg0, arg1) => {
            post_id = filme_data.posts[Number(arg1)].post_id;
        });

        when(/^Eu preencho "(.*)" no campo de comentário$/, (arg0) => {
            comment_test = {
                "user_id": 100,
                "response_id": post_id,
                "comment": arg0,
            };
        });

        and(/^clico no botão "(.*)"$/, (arg0) => {
            // Fazendo a requisição POST
            const response = axios.post('http://localhost:3000/comment', comment_test);
        });

        then(/^O comentário deve ser adicionado ao post$/, async () => {
            // Fazendo a requisição GET)
            const response = await axios.get('http://localhost:3000/');

            // Verificando se o comentário foi criado
            expect(response.data.some((comment) => comment.comment_id === comment_test.comment_id)).toBe(true);
        });
    })

    test('Atualizar um comentário', ({ given, when, and, then }) => {
        let filme_data;
        let post_id;
        let comment_test;
        let comment_final;
        let comment_id;

        given(/^Eu Estou na página do filme "(.*)"$/, async (arg0) => {
            // Fazendo a requisição GET
            const response = await axios.get('http://localhost:3000/');
            // Armazenando o filme_id do filme especificado
            filme_data = response.data.find((filme) => filme.nome === arg0);
        });

        and(/^Eu já publiquei um comentário com o texto "(.*)" respondendo o primeiro "(.*)" review$/, async (arg0, arg1) =>{
            post_id = filme_data.posts[Number(arg1)].post_id;

            comment_test = {
                "user_id": 100,
                "response_id": post_id,
                "comment": arg0,
            }

            // Fazendo a requisição POST
            comment_id = await axios.post('http://localhost:3000/comment', comment_test);
        })

        when(/^Eu altero o texto para "(.*)"$/, (arg0) => {
            
            comment_test = {
                "user_id": 100,
                "comment_id": comment_id.data.comment_id,
                "comment": arg0
            }
        })

        and (/^clico no botão "(.*)"$/, async (arg0) => {
            // Fazendo a requisição PUT
            comment_final = await axios.put('http://localhost:3000/comment', comment_test);
        })

        then(/^O comentário deve ser atualizado$/, async () => {
            // Fazendo a requisição GET
            const response = await axios.get('http://localhost:3000/');
            // Verificando se o comentário foi atualizado
            let comment = findById(response.data, comment_final.data.comment_id);

            expect(comment.comment === comment_final.data.comment).toBe(true);
        })
    })

    test('Apagar um comentário', ({ given, when, and, then }) => {
        let filme_data;
        let post_id;
        let comment_test;
        let comment_id;

        given(/^Eu Estou na página do filme "(.*)"$/, async (arg0) => {
            // Fazendo a requisição GET
            const response = await axios.get('http://localhost:3000/');
            // Armazenando o filme_id do filme especificado
            filme_data = response.data.find((filme) => filme.nome === arg0);
        });

        and(/^Eu já publiquei um comentário com o texto "(.*)" respondendo o primeiro "(.*)" review$/, async (arg0, arg1) => {
            post_id = filme_data.posts[Number(arg1)].post_id;

            comment_test = {
                "user_id": 100,
                "response_id": post_id,
                "comment": arg0
            }
            // Fazendo a requisição POST
            comment_id = await axios.post('http://localhost:3000/comment', comment_test);
        })

        when(/^Eu clico no botão "(.*)"$/, async (arg0) => {
            // Fazendo a requisição DELETE
            
            const delete_req = {
                "user_id": 100,
                "response_id": comment_id.data.comment_id
            }

            await axios.delete('http://localhost:3000/comment', {data: delete_req});
        });

        then(/^O comentário deve ser removido do post$/, async () => {
            // Fazendo a requisição GET
            const response = await axios.get('http://localhost:3000/');
            // Verificando se o comentário foi excluído
            let res = findById(response.data, comment_id.data.comment_id);
            expect(res === null).toBe(true);
        })
    })

    test('Falha ao criar um comentário vazio', ({ given, when, and, then }) => {
        let filme_data;
        let post_id;
        let comment_test;
        let erro;

        given(/^Eu Estou na página do filme "(.*)"$/, async (arg0) => {
            // Fazendo a requisição GET
            const response = await axios.get('http://localhost:3000/');
            // Armazenando o filme_id do filme especificado
            filme_data = response.data.find((filme) => filme.nome === arg0);
        });

        and(/^aperto no botão "(.*)" do primeiro "(.*)" review$/, (arg0, arg1) => {
            post_id = filme_data.posts[Number(arg1)].post_id;
        });

        when(/^Eu deixo o campo de comentário vazio "(.*)"$/, async (arg0) => {
            comment_test = {
                "user_id": 100,
                "response_id": post_id,
                "comment": arg0
            }
        });

        and(/^clico no botão "(.*)"$/, async (arg0) => {
            // Fazendo a requisição POST
            try {
                comment_test = await axios.post('http://localhost:3000/comment', comment_test);
            } catch (error) {
                erro = error.response.data.error;
            }
        });

        then(/^Uma mensagem de erro deve ser exibida$/, async () => {
            expect(erro).toBe("Comment not found");
        })
    })

    test('Criar um comentário de comentário', ({ given, when, and, then }) => {
        let filme_data;
        let post_id;
        let comment_test;
        let comment_id;

        given(/^Eu Estou na página do filme "(.*)"$/, async (arg0) => {
            // Fazendo a requisição GET
            const response = await axios.get('http://localhost:3000/');
            // Armazenando o filme_id do filme especificado
            filme_data = response.data.find((filme) => filme.nome === arg0);
        });

        and(/^aperto no botão "(.*)" do primeiro "(.*)" comentario da primeira "(.*)" review que tinha escrito "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
            post_id = filme_data.posts[Number(arg1)].post_id;

            comment_test = {
                "user_id": 200,
                "response_id": post_id,
                "comment": arg3
            }

            // Fazendo a requisição POST
            comment_id = await axios.post('http://localhost:3000/comment', comment_test);
            
            
            post_id = comment_id.data.comment_id;
        });

        when(/^Eu preencho "(.*)" no campo de comentário$/, (arg0) => {
            comment_test = {
                "user_id": 100,
                "response_id": post_id,
                "comment": arg0,
            };
        });

        and(/^clico no botão "(.*)"$/, async (arg0) => {
            // Fazendo a requisição POST
            comment_id = await axios.post('http://localhost:3000/comment', comment_test);
        });

        then(/^O comentário deve ser adicionado ao post$/, async () => {
            // Fazendo a requisição GET)
            const response = await axios.get('http://localhost:3000/');
            
            comment_test = findById(response.data, comment_id.data.comment_id);
            // Verificando se o comentário foi criado
            expect(comment_test.comment_id === comment_test.comment_id).toBe(true);
        });
    })

    test('Erro ao apagar um comentário de outro usuário', ({ given, when, and, then }) => {
        let filme_data;
        let post_id;
        let comment_test;
        let comment_id;
        let erro;

        given(/^Eu Estou na página do filme "(.*)"$/, async (arg0) => {
            // Fazendo a requisição GET
            const response = await axios.get('http://localhost:3000/');
            // Armazenando o filme_id do filme especificado
            filme_data = response.data.find((filme) => filme.nome === arg0);
        });

        and(/^O usuário "(.*)" publicou um comentário com o texto "(.*)" respondendo o primeiro "(.*)" review$/, async (arg0, arg1, arg2) => {
            post_id = filme_data.posts[Number(arg2)].post_id;

            comment_test = {
                "user_id": arg0,
                "response_id": post_id,
                "comment": arg1
            }
            // Fazendo a requisição POST
            comment_id = await axios.post('http://localhost:3000/comment', comment_test);
        })

        when(/^Eu clico no botão "(.*)"$/, async (arg0) => {
            // Fazendo a requisição DELETE
            
            const delete_req = {
                "user_id": 100,
                "response_id": comment_id.data.comment_id
            }

            try{
                await axios.delete('http://localhost:3000/comment', {data: delete_req});
            } catch (error) {
                erro = error.response.data.error;
            }
        });

        then(/^O comentário deve ser removido do post$/, async () => {
            expect(erro).toBe("Comment not found or user not authorized");
        })
    })
})