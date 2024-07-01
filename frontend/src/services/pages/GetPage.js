import api from "../index";

export default async function GetPage(id) {
  try {
    const response = await api.get(`/pages/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
