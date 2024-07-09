import api from '../index'

export default async function DeletePost(filme_id) {
  try {
    const data = {
      filme_id: filme_id
    }
    const response = await api.delete('/movies', { data: data })
    return response
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === 'Filme não encontrado') {
      return 'Filme não encontrado'
    } else {
      return 'Error'
    }
  }
}
