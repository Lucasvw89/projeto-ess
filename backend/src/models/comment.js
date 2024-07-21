const { v4: uuidv4 } = require('uuid');
const movies = require('../db/db');

class Comment {
    constructor(user_id, response_id, comment) {
        this.comment_id = uuidv4().slice(0, -1); // Gerar automaticamente um UUID
        this.post_id = response_id;
        this.user_id = user_id;
        this.comment = comment;
        this.comments = [];
    }

    // Função de busca de comentários em comentários
    static findCommentById(comments, commentId, del, user_id) {
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            if (comment.comment_id === commentId) {
                if (del) {
                    if (comment.user_id === user_id) {
                        comments.splice(i, 1); // Remove o comentário encontrado se del for true
                        return true;
                    }
                    return false;
                }
                return comment;
            } else if (comment.comments.length > 0) {
                const foundComment = Comment.findCommentById(comment.comments, commentId, del, user_id);
                if (foundComment) {
                    return foundComment;
                }
            }
        }
        return null; // Retorna null se não encontrar o comentário
    }

    // Função de busca de comentários em reviews
    static findById(id, del = false, user_id = Infinity) {
        if (id.length == 35) {
            // Procurar em comentários
            for (const filme of movies) {
                if(filme.posts){
                    for (const post of filme.posts) {
                        const foundComment = Comment.findCommentById(post.comments, id, del, user_id);
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
                        if (del) {
                            if (post.user_id === user_id) {
                                filme.posts.splice(i, 1); // Remove o post encontrado se del for true
                                return true;
                            }
                            return false;
                        }
                        return post;
                    }
                }
            }
        }
        return null; // Retorna null se não encontrar o post ou comentário
    }

    // Função de atualização de comentários
    static updateCommentById(commentId, user_id, newCommentText) {
        for (const filme of movies) {
            for (const post of filme.posts) {
                const comment = Comment.findCommentById(post.comments, commentId, false, user_id);
                if (comment) {
                    if (comment.user_id === user_id) {
                        comment.comment = newCommentText; // Atualiza o texto do comentário
                        return comment;
                    } else {
                        return false; // Usuário não autorizado
                    }
                }
            }
        }
        return null; // Retorna null se não encontrar o comentário
    }
}

module.exports = Comment;
