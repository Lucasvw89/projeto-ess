import api from '../index'

export default async function EditMovie(filme_id, poster, nome, ano, duracao, sinopse, diretor, genero, plataformas) {
  try {
    const data = {
      filme_id: filme_id,
      poster: poster,
      nome: nome,
      ano: ano,
      duracao: duracao,
      sinopse: sinopse,
      diretor: diretor,
      genero: genero,
      plataformas: plataformas
    }
    const response = await api.put('/movies', data)
    return response
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === 'Filme não encontrado') {
      return 'Filme não encontrado'
    } else if (error.response && error.response.data && error.response.data.error === 'Nenhum campo para atualizar') {
      return 'Nenhum campo para atualizar'
    } else {
      return 'Error'
    }
  }
}
