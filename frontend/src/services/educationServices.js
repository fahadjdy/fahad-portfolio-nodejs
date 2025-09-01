import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`+"/educations";
const token = localStorage.getItem("token");

export default {
  async getAll() {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async add(education) {
    const response = await axios.post(API_URL + "/add", education, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async update(id, education) {
    const response = await axios.put(`${API_URL}/edit/${id}`, education, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async delete(id) {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
