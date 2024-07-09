import api from '../index'

export default async function AddMovie(poster, nome, ano, duracao, sinopse, diretor, genero) {
  try {
    const data = {
      poster: poster,
      nome: nome,
      ano: ano,
      duracao: duracao,
      sinopse: sinopse,
      diretor: diretor,
      genero: genero
    }
    const response = await api.post('/movies', data)
    return response
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === 'Filme já cadastrado no sistema') {
      return 'Filme já cadastrado no sistema'
    } else if (error.response && error.response.data && error.response.data.error === 'O poster não foi adicionado') {
      return 'O poster não foi adicionado'
    } else if (error.response && error.response.data && error.response.data.error === 'O campo nome não foi preenchido') {
      return 'O campo nome não foi preenchido'
    } else if (error.response && error.response.data && error.response.data.error === 'O campo ano não foi preenchido') {
      return 'O campo ano não foi preenchido'
    } else if (error.response && error.response.data && error.response.data.error === 'O campo duração não foi preenchido') {
      return 'O campo duração não foi preenchido'
    } else if (error.response && error.response.data && error.response.data.error === 'O campo sinopse não foi preenchido') {
      return 'O campo sinopse não foi preenchido'
    } else if (error.response && error.response.data && error.response.data.error === 'O campo diretor não foi preenchido') {
      return 'O campo diretor não foi preenchido'
    } else if (error.response && error.response.data && error.response.data.error === 'O campo genero não foi preenchido') {
      return 'O campo genero não foi preenchido'
    } else {
      return 'Error'
    }
  }
}
