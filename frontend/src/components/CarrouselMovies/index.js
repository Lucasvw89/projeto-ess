import React, { useEffect } from 'react'
import styles from './styles'
import GetFilmes from '../../services/filmes/GetFilmes'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import MovieFrame from '../MovieFrame'

const CarouselMovies = () => {
  const [filmes, setFilmes] = React.useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await GetFilmes()
      setFilmes(response.data)
    }
    fetchData()
  }, [])

  const scrollLeft = () => {
    document.getElementById('carousel').scrollBy({
      left: -1186,
      behavior: 'smooth'
    })
  }

  const scrollRight = () => {
    document.getElementById('carousel').scrollBy({
      left: 1186,
      behavior: 'smooth'
    })
  }

  if (!filmes || !filmes.length) return null

  return (
    <div style={styles.carouselContainer}>
      <FaChevronLeft style={styles.leftClickArea} onClick={scrollLeft} />
      <div id='carousel' style={styles.carousel}>
        <div style={styles.image_div}>
          <MovieFrame />
        </div>

        {filmes.map((movie) => {
          const { filme_id, nome, poster } = movie
          return (
            <div key={filme_id} style={styles.movie}>
              <div style={styles.image_div}>
                <img style={styles.image} src={poster} alt='movie' draggable='false' />
                <span style={styles.title}>{nome}</span>
              </div>
            </div>
          )
        })}
      </div>
      <FaChevronRight style={styles.leftClickArea} onClick={scrollRight} />
    </div>
  )
}

export default CarouselMovies
