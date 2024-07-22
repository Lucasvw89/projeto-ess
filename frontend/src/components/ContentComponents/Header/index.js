import React, { useState } from 'react'
import styles from './styles' // Certifique-se de importar corretamente os estilos
import { CiSearch } from 'react-icons/ci'
import { BsPersonCircle } from 'react-icons/bs'
import SearchFilmes from '../../../services/search/Search' // Importe a função de busca
import GetFilmes from '../../../services/filmes/GetFilmes'

const Header = ({ topRightName, retornar_filmes }) => {
  const [busca, setBusca] = useState('')

  const handleInputChange = (event) => {
    setBusca(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      let result = []

      if (busca === '') {
        result = await GetFilmes()
      } else {
        result = await SearchFilmes(busca) // Chama a função de busca com o valor atual de busca
      }

      retornar_filmes(result.data)
      console.log('Resultados da busca:', result.data)
    } catch (error) {
      console.error('Erro na busca:', error)
      // Trate o erro conforme necessário
    }
  }

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
          <input
            style={styles.input_name}
            type='text'
            id='busca'
            name='nome-filme'
            placeholder='Nome do Filme'
            value={busca}
            onChange={handleInputChange}
          />
          <input
            type='submit'
            id='entrar-busca'
            value='Buscar'
            onClick={handleSubmit} // Chama o handleSubmit ao clicar no botão de buscar
          />
        </div>
        <BsPersonCircle style={styles.profile} />
        <p>{topRightName}</p>
      </div>
    </div>
  )
}

export default Header

// import React from 'react'
// import styles from './styles'
// import { CiSearch } from 'react-icons/ci'
// import { BsPersonCircle } from 'react-icons/bs'
// import SearchFilmes from '../../../services/search/Search'
//
// const Header = ({ topRightName }) => {
//   return (
//     <div style={styles.background}>
//       <div style={styles.title}>
//         <p style={styles.fonte_titulo}>CINNEMA</p>
//       </div>
//       <div style={styles.options}>
//         <p style={styles.about}>SOBRE</p>
//         <p style={styles.about}>FILMES</p>
//         <div>
//           <CiSearch />
//           <input style={styles.input_name} type='text' id='busca' name='nome-filme' placeholder='Nome do Filme' />
//           <input type='submit' id='entrar-busca' value='Buscar' onClick={SearchFilmes()}/>
//         </div>
//         <BsPersonCircle style={styles.profile} />
//         <p>{topRightName}</p>
//       </div>
//     </div>
//   )
// }
//
// export default Header
