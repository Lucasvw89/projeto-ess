import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.comment}</p>
      {comment.comments.length > 0 && (
        <div className="nested-comments">
          {comment.comments.length > 0 && <p>Comentários:</p>}
          {comment.comments.map(nestedComment => (
            <Comment key={nestedComment.comment_id} comment={nestedComment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
