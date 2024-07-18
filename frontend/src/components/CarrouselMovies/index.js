import React, { useEffect } from 'react'
import styles from './styles'
import GetFilmes from '../../services/filmes/GetFilmes'

const CarouselMovies = () => {
  const [filmes, setFilmes] = React.useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await GetFilmes()
      setFilmes(response.data)
    }
    fetchData()
  }, [])

  if (!filmes || !filmes.length) return null
  return (
    <div style={styles.carousel}>
      {filmes.map((movie) => {
        const { filme_id, nome, poster } = movie
        return (
          <div key={filme_id} style={styles.movie}>
            <div style={styles.image_div}>
              <img style={styles.image} src={poster} alt='movie' draggable='false' />
              <span style={styles.title}> {nome}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CarouselMovies
