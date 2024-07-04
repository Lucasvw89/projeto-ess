import api from '../index'

export default async function DeletePost(post_id, user_id, filme_id) {
  try {
    const data = {
      post_id: post_id,
      user_id: user_id,
      filme_id: filme_id
    }
    const response = await api.delete('/posts', { data: data })
    return response
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error === 'Post not found.') {
      return 'Post not found.'
    } else {
      return 'Error'
    }
  }
}
