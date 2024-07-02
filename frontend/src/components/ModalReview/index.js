import React, { useState } from 'react'
import { Rating } from '@mui/material'
import styles from './styles'
import CreatePost from '../../services/posts/CreatePost'
import { IoCloseSharp } from 'react-icons/io5'
import StarIcon from '@mui/icons-material/Star'

const ModalReview = ({ isOpen, setModalOpen, imageUrl, filme_id, filme_nome, filme_ano }) => {
  const [postText, setPostText] = useState('')
  const [rating, setRating] = useState()

  const handleCreatePost = async () => {
    const response = await CreatePost('Miguel Oliveira', filme_id, rating, postText)
    if (response.status === 201) {
      setPostText('')
      setRating()
      setModalOpen()
    } else if (response === 'Nota is required.') {
      alert('Nota é obrigatória')
    } else {
      alert('Erro ao enviar review')
    }
  }

  if (isOpen) {
    return (
      <div style={styles.background}>
        <div style={styles.modal}>
          <div style={styles.cotainer}>
            <div style={styles.exit}>
              <IoCloseSharp size={32} onClick={setModalOpen} style={styles.exit__btn} />
            </div>
            <div style={styles.body}>
              <div style={styles.image}>
                <img src={imageUrl} alt='Modal Image' style={styles.imageContent} />
              </div>
              <div style={styles.content}>
                <div style={styles.title}>
                  <p style={styles.title__text}>Eu assisti...</p>
                  <div style={styles.title__movie}>
                    <p style={styles.title__movie_name}>{filme_nome}</p>
                    <p style={styles.title__movie_year}>{filme_ano}</p>
                  </div>
                </div>
                <div style={styles.form}>
                  <textarea
                    type='text'
                    placeholder='Escreva aqui sua review...'
                    style={styles.textarea}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    rows={12}
                  />
                  <div style={styles.form__bottom}>
                    <div style={styles.form__bottom__nota}>
                      <p style={styles.form__bottom__nota_label}>Nota</p>
                      <Rating
                        name='simple-controlled'
                        value={rating}
                        precision={0.5}
                        onChange={(_, value) => {
                          setRating(value)
                        }}
                        emptyIcon={<StarIcon style={{ color: '#D9D9D9' }} />}
                        icon={<StarIcon style={{ color: '#FF182C' }} />}
                      />
                    </div>
                    <button style={styles.button} onClick={handleCreatePost}>
                      ENVIAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default ModalReview
