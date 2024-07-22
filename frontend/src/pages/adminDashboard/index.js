import React, { useState } from 'react'
import styles from './styles'
import ModalContentAdd from '../../components/ContentComponents/ModalContentAdd'
import CarouselMovies from '../../components/ContentComponents/CarrouselMovies'
import Header from '../../components/ContentComponents/Header'

const AdminDashboard = () => {
  const [showContent, setShowContent] = useState(false)
  const [filmes_novos, setfilmes] = useState('')

  function retornar_filmes(result) {
    setfilmes(result)
  }

  function handleContent() {
    setShowContent(!showContent)
  }

  function ModalAddMovie(props) {
    return <>{props.showContent && <ModalContentAdd showContent={showContent} handleContent={handleContent} />}</>
  }

  return (
    <div style={styles.background}>
      <Header topRightName={'ADM'} retornar_filmes={retornar_filmes} />
      <div>
        <CarouselMovies filmes_novos={filmes_novos} handleContent={handleContent} showMovieFrame={true} />
        {showContent && <ModalAddMovie showContent={showContent} />}
      </div>
    </div>
  )
}

export default AdminDashboard
