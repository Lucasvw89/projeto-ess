import api from '../index'

export default async function UpdatePost(post_id, user_id, filme_id, nota, review) {
  try {
    const data = {
      post_id: post_id,
      user_id: user_id,
      filme_id: filme_id,
      nota: nota,
      review: review
    }
    const response = await api.put('/posts', data)
    return response
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === 'Nota is required.') {
      return 'Nota is required.'
    } else {
      return 'Error'
    }
  }
}
