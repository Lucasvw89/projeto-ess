import React from 'react'
import styles from './styles'
import { CiSearch } from 'react-icons/ci'
import { BsPersonCircle } from 'react-icons/bs'

const Header = ({ topRightName }) => {
  return (
    <div style={styles.background}>
      <div style={styles.title}>
        <p style={styles.fonte_titulo}>CINNEMA</p>
      </div>
      <div style={styles.options}>
        <p style={styles.about}>SOBRE</p>
        <p style={styles.about}>FILMES</p>
        <div>
          <CiSearch />
          <input style={styles.input_name} type='text' id='nome-filme' name='nome-filme' placeholder='Nome do Filme' />
        </div>
        <BsPersonCircle style={styles.profile} />
        <p>{topRightName}</p>
      </div>
    </div>
  )
}

export default Header
