import axios from "axios";

const API_URL = "http://localhost:8889/fahad-jadiya/experience";

export default {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async add(experience) {
    const response = await axios.post(API_URL, experience);
    return response.data;
  }
};
