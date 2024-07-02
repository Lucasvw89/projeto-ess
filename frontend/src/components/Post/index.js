import React from 'react'
import Comment from '../Comment'
import styles from './styles'
import { Rating } from '@mui/material'
import { HiDotsVertical } from 'react-icons/hi'
import { PiArrowBendDownLeftFill } from 'react-icons/pi'
import StarIcon from '@mui/icons-material/Star'

const Post = ({ post }) => {
  return (
    <div className='post' style={styles.container}>
      <div style={styles.post__header}>
        <div style={styles.post__header__data}>
          <p style={styles.post__header__data_userID}>{post.user_id}</p>
          <Rating
            name='half-rating-read'
            defaultValue={post.nota}
            precision={0.5}
            readOnly
            emptyIcon={<StarIcon style={{ color: '#D9D9D9' }} />}
            icon={<StarIcon style={{ color: '#FF182C' }} />}
          />
        </div>
        <div style={styles.post__header__options}>
          <HiDotsVertical />
        </div>
      </div>
      <div style={styles.post__body}>
        <p style={styles.post__body__content_review}>{post.review}</p>
      </div>
      <div style={styles.post__footer}>
        <div style={styles.post__footer_arrow}>
          <PiArrowBendDownLeftFill />
        </div>
        {post.comments.length > 0 && <h3>Comentários:</h3>}
        {post.comments.length > 0 && post.comments.map((comment) => <Comment key={comment.comment_id} comment={comment} />)}
      </div>
    </div>
  )
}

export default Post
