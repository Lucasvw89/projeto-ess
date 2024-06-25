import api from "../index";

export default async function DeletePost(post_id, userd_id, filme_id) {
  try {
    const data = {
        "post_id": post_id,
        "user_id": userd_id,
        "filme_id": filme_id,
        };
    const response = await api.delete("/posts", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}