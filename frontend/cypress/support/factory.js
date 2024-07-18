const axios = require('axios')

class Factory {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL
    })
  }

  async create() {
    const movieData = {
      nome: 'Teste',
      ano: '1337',
      duracao: '1h54m',
      genero: '1',
      sinopse: 'John doe.',
      poster: 'https://image.tmdb.org/t/p/original/qirvDexByE5erglM8fdIm0AEVFD.jpg'
    }
    try {
      const response = await this.api.post('/movie', movieData)
      return response.data.filme_id
    } catch (error) {
      console.error('Error creating movie:', error)
      throw error
    }
  }

  async delete(filmeId) {
    try {
      const response = await this.api.delete('/movie', {
        data: {
          filme_id: filmeId
        }
      })
      return response.data
    } catch (error) {
      console.error('Error deleting movie:', error)
      throw error
    }
  }
}
