import axios from "axios";

const API_URL = "http://localhost:8889/fahad-jadiya/experience";

export default {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async add(experience) {
    const response = await axios.post(API_URL+"/add", experience);
    return response.data;
  },
  async update(id, experience) {
    const response = await axios.put(`${API_URL}/edit/${id}`, experience);
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  }
};
