import React from 'react'
import styles from './styles'
import { IoCloseSharp } from 'react-icons/io5'

const ModalContent = () => {
  return (
    <div style={styles.background}>
      <div style={styles.modal}>
        <div style={styles.titulo}>
          <p style={styles.fonte_titulo}>Cadastrar Filme:</p>
          <IoCloseSharp size={48} cursor={'pointer'} />
        </div>
        <div style={styles.content}>
          <img
            src='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg'
            alt='Poster do Filme'
            style={styles.poster_img}
          />
          <div style={styles.form}>
            <div style={styles.info}>
              <input style={styles.input_name} type='text' id='nome-filme' name='nome-filme' placeholder='Nome do Filme' />
              <input style={styles.input_year} type='text' id='ano' name='ano' placeholder='Ano' />
              <input style={styles.input_duration} type='text' id='duracao' name='duracao' placeholder='Duração' />
              <input style={styles.input_genre} type='text' id='genero' name='genero' placeholder='Gênero' />
            </div>
            <textarea type='text' placeholder='Adicionar sinopse...' style={styles.sinopse_textarea} rows='12'></textarea>
          </div>
        </div>
        <div style={styles.confirm}>
          <button style={styles.button_confirm}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalContent
