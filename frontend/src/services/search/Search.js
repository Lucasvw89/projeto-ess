import api from '../index'

export default async function SearchFilmes(nome) {
  try {
    const parametro_de_busca = {
      busca: nome
    }

    console.log(parametro_de_busca)

    const response = await api.get('/search', { params: parametro_de_busca })
    return response
  } catch (error) {
    console.error(error)
  }
}
