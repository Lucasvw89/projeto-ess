const Comment = require('../models/comment');

exports.createComment = (req, res) => {
    try {
        const { user_id, response_id, comment } = req.body;
        
        if (comment === '') {
            return res.status(400).json({ error: 'Comment not found' });
        }

        const newComment = new Comment(user_id, response_id, comment);

        const resposta = Comment.findById(response_id);

        if (!response_id || resposta == null) {
            return res.status(404).json({ error: 'Post or comment not found' });
        }

        // Adiciona comentário no database
        resposta.comments.push(newComment);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteComment = (req, res) => {
    try {
        const { user_id, response_id } = req.body;

        if (!response_id) {
            return res.status(404).json({ error: 'Post or comment not found' });
        }

        const resposta = Comment.findById(response_id, true, user_id);
        
        if (!resposta) {
            return res.status(400).json({ error: 'Comment not found or user not authorized' });
        }
        
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.putComment = (req, res) => {
    try {
        const { user_id, comment_id, comment } = req.body;

        if (!comment_id || !comment) {
            return res.status(400).json({ error: 'Invalid request parameters' });
        }

        const updatedComment = Comment.updateCommentById(comment_id, user_id, comment);

        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found or user not authorized' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
