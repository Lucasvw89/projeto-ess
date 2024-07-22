//import api from '../index'
import axios from 'axios'

export default async function SearchFilmes(nome) {
  try {
    const opa = {
      busca: nome
    }

    console.log(opa)

    const response = await axios.get('http://localhost:3000/search', { params: opa })
    return response
  } catch (error) {
    console.error(error)
  }
}
