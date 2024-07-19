import React, { useState } from 'react'
import styles from './styles'
import { IoCloseSharp } from 'react-icons/io5'
import MovieFrame from '../MovieFrame'
import AddMovie from '../../../services/content/AddMovie'

const ModalContentAdd = ({ handleContent }) => {
  const [postName, setPostName] = useState('')
  const [postYear, setPostYear] = useState('')
  const [postDuration, setPostDuration] = useState('')
  const [postGenre, setPostGenre] = useState('')
  const [postSynopsis, setPostSynopsis] = useState('')
  const [postImage, setPostImage] = useState('')

  const [switchImage, setSwitchImage] = useState(false)

  const handleAddMovie = async () => {
    const response = await AddMovie(postImage, postName, postYear, postDuration, postSynopsis, postGenre)
    console.log(response.status)
    if (response.status === 201) {
      alert('Filme cadastrado com sucesso!')
      setPostName('')
      setPostYear('')
      setPostDuration('')
      setPostGenre('')
      setPostSynopsis('')
      handleContent()
    } else if (response === 'Filme já cadastrado no sistema') {
      alert('Filme já cadastrado no sistema')
      // } else if (response === 'O poster não foi adicionado') {
      //   alert('Preencha o campo "Poster"')
    } else if (response === 'O campo nome não foi preenchido') {
      alert('Preencha o campo "Nome"')
    } else if (response === 'O campo ano não foi preenchido') {
      alert('Preencha o campo "Ano"')
    } else if (response === 'O campo duração não foi preenchido') {
      alert('Preencha o campo "Duração"')
    } else if (response === 'O campo sinopse não foi preenchido') {
      alert('Preencha o campo "Sinopse"')
      // } else if (response === 'O campo diretor não foi preenchido') {
      //   alert('Preencha o campo "Diretor"')
    } else if (response === 'O campo genero não foi preenchido') {
      alert('Preencha o campo "Gênero"')
    } else {
      alert('Erro ao cadastrar filme')
    }
  }

  const handleSwitchImage = async () => {
    let text
    text = prompt('Coloque a URL da imagem do poster do filme: ')
    if (text) {
      setSwitchImage(!switchImage)
      setPostImage(text)
    }
  }

  function toggleImage(props) {
    return (
      <>
        {' '}
        {!props.switchImage ? (
          <MovieFrame style={styles.poster_img} onClick={handleSwitchImage} />
        ) : (
          <img src={postImage} alt='Poster do Filme' style={styles.poster_img} />
        )}
      </>
    )
  }

  return (
    <div style={styles.background}>
      <div style={styles.modal}>
        <div style={styles.titulo}>
          <p style={styles.fonte_titulo}>Cadastrar Filme:</p>
          <IoCloseSharp size={48} cursor={'pointer'} onClick={handleContent} />
        </div>
        <div style={styles.content}>
          {toggleImage({ switchImage })}
          <div style={styles.form}>
            <div style={styles.info}>
              <input
                style={styles.input_name}
                type='text'
                placeholder='Nome do Filme'
                value={postName}
                onChange={(e) => setPostName(e.target.value)}
              />
              <input
                style={styles.input_year}
                type='text'
                placeholder='Ano'
                value={postYear}
                onChange={(e) => setPostYear(e.target.value)}
              />
              <input
                style={styles.input_duration}
                type='text'
                placeholder='Duração'
                value={postDuration}
                onChange={(e) => setPostDuration(e.target.value)}
              />
              <input
                style={styles.input_genre}
                type='text'
                placeholder='Gênero'
                value={postGenre}
                onChange={(e) => setPostGenre(e.target.value)}
              />
            </div>
            <textarea
              type='text'
              placeholder='Adicionar sinopse...'
              style={styles.sinopse_textarea}
              value={postSynopsis}
              onChange={(e) => setPostSynopsis(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div style={styles.confirm} onClick={handleAddMovie}>
          <button style={styles.button_confirm}> Confirmar </button>
        </div>
      </div>
    </div>
  )
}

export default ModalContentAdd
