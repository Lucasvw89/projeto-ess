import React, { useEffect } from 'react'
import styles from './styles'
import GetFilmes from '../../../services/filmes/GetFilmes'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import MovieFrame from '../MovieFrame'
import { Link } from 'react-router-dom'

const CarouselMovies = ({ handleContent, showMovieFrame }) => {
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

  function handleMovieFrame(props) {
    return (
      <>
        {' '}
        {props.showMovieFrame ? (
          <div style={styles.image_div}>
            <MovieFrame onClick={handleContent} />
          </div>
        ) : (
          <></>
        )}
      </>
    )
  }

  if (!filmes || !filmes.length) return null

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.divTitle}>
        <p style={styles.p}>Filmes</p>
      </div>
      <div style={styles.carouselDiv}>
        <FaChevronLeft style={styles.leftClickArea} onClick={scrollLeft} />
        <div id='carousel' style={styles.carousel}>
          {handleMovieFrame({ showMovieFrame })}
          {filmes.map((movie) => {
            const { filme_id, nome, poster } = movie
            return (
              <Link to={`/filme/${filme_id}`} key={filme_id} style={styles.movie}>
                <div style={styles.image_div}>
                  <img style={styles.image} src={poster} alt='movie' draggable='false' />
                  <span style={styles.title}>{nome}</span>
                </div>
              </Link>
            )
          })}
        </div>
        <FaChevronRight style={styles.leftClickArea} onClick={scrollRight} />
      </div>
    </div>
  )
}

export default CarouselMovies
