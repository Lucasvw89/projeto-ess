import React, { useState } from 'react'
import styles from './styles'
import MovieFrame from '../../components/MovieFrame'
import ModalContentAdd from '../../components/ModalContentAdd'

const AdminDashboard = () => {
  const [showContent, setShowContent] = useState(false)

  function handleContent() {
    setShowContent(!showContent)
  }

  function ModalAddMovie(props) {
    return <>{props.showContent && <ModalContentAdd />}</>
  }
  return (
    <div style={styles.container}>
      <div>
        <h1>Bem vindo ao dashboard</h1>
        <ModalAddMovie showContent={showContent} />
        <MovieFrame onClick={handleContent} />
      </div>
    </div>
  )
}

export default AdminDashboard
