import React from 'react'
import styles from './styles'
import { CiCirclePlus } from 'react-icons/ci'

const MovieFrame = ({ onClick }) => {
  return (
    <div style={styles.rectangle}>
      <CiCirclePlus size={120} cursor={'pointer'} onClick={onClick} />
    </div>
  )
}

export default MovieFrame
