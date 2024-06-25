import api from "../index";

export default async function CreatePost(userd_id, filme_id, nota, review) {
  try {
    const data = {
        "user_id": userd_id,
        "filme_id": filme_id,
        "nota": nota,
        "review": review,
        };
    const response = await api.post("/posts", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}