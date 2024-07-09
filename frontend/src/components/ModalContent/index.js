import React from 'react'
import { Rating } from '@mui/material'
import styles from './styles'
// import CreatePost from '../../services/posts/CreatePost'
// import UpdatePost from '../../services/posts/UpdatePost'
// import { IoCloseSharp } from 'react-icons/io5'
import StarIcon from '@mui/icons-material/Star'

const ModalReview = ({ imageUrl }) => {
  const jaca = 2
  imageUrl = 'https://m.media-amazon.com/images/I/71lqDylcvGL._AC_SL1500_.jpg'
  if (jaca == 2) {
    return (
      <div style={styles.background}>
        <div style={styles.modal}>
          <div style={styles.cotainer}>
            <div style={styles.exit}></div>
            <div style={styles.body}>
              <div style={styles.image}>
                <img src={imageUrl} alt='Modal Image' style={styles.imageContent} />
              </div>
              <div style={styles.content}>
                <div style={styles.title}>
                  <textarea type='text' placeholder='Nome do Filme' style={styles.textarea__name} rows={1} />
                  <textarea type='text' placeholder='Ano' style={styles.textarea__year} rows={1} />
                  <textarea type='text' placeholder='Duração' style={styles.textarea__time} rows={1} />
                  <textarea type='text' placeholder='Gênero' style={styles.textarea__genre} rows={1} />
                </div>
                <div style={styles.form}>
                  <textarea type='text' placeholder='Escreva aqui sua review...' style={styles.sinopsis} rows={12} />
                  <div style={styles.form__bottom}>
                    <div style={styles.form__bottom__nota}>
                      <p style={styles.form__bottom__nota_label}>Nota</p>
                      {<p style={styles.form__bottom__nota_error}>Nota é obrigatória</p>}
                      <Rating
                        name='simple-controlled'
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ color: '#D9D9D9' }} />}
                        icon={<StarIcon style={{ color: '#FF182C' }} />}
                      />
                    </div>
                    <button style={styles.button}></button>
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
