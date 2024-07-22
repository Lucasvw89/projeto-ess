import React, { useEffect } from 'react'
import styles from './styles'
import { CiSearch } from 'react-icons/ci'
import GetFilmes from '../../../services/filmes/GetFilmes'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import MovieFrame from '../MovieFrame'
import { Link } from 'react-router-dom'

const CarouselMovies = ({ filmes_novos, handleContent, showMovieFrame }) => {
  const [filmes, setFilmes] = React.useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await GetFilmes()
      setFilmes(response.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (filmes_novos && filmes_novos.length > 0) {
      setFilmes(filmes_novos)
    } else if (filmes_novos && filmes_novos === 404) {
      setFilmes([])
    }
  }, [filmes_novos])

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

  if (!filmes || !filmes.length)
    return (
      <div style={styles.carouselContainer}>
        <div style={styles.divTitle}>
          <p style={styles.p}></p>
        </div>
        <div style={styles.errorMessage}>
          <CiSearch style={styles.icon} />
          <p>Infelizmente não foram encontrados resultados para a sua busca :(</p>
        </div>
      </div>
    )

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
