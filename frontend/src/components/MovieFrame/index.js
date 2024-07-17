import React from 'react'
import styles from './styles'
import { CiCirclePlus } from 'react-icons/ci'

const MovieFrame = () => {
  return (
    <div style={styles.rectangle}>
      <CiCirclePlus size={120} cursor={'pointer'} />
    </div>
  )
}

export default MovieFrame
