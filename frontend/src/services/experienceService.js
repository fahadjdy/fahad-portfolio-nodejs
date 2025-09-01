import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}` + "/experience";
const token = localStorage.getItem('token');

export default {
  async getAll() {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async add(experience) {
    const response = await axios.post(API_URL+"/add", experience,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  async update(id, experience) {
    const response = await axios.put(`${API_URL}/edit/${id}`, experience,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(`${API_URL}/delete/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};
