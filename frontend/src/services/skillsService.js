import axios from "axios";

const API_URL = "http://localhost:8889/fahad-jadiya/skills";
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

  async add(skills) {
    const response = await axios.post(API_URL+"/add", skills,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  async update(id, skills) {
    const response = await axios.put(`${API_URL}/edit/${id}`, skills,{
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
