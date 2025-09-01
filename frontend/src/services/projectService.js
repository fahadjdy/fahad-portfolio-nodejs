import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}` + "/projects";
const token = localStorage.getItem("token");

// function getAuthHeaders(isMultipart = false) {
//   return {
//     Authorization: `Bearer ${token}`,
//     ...(isMultipart ? { "Content-Type": "multipart/form-data" } : {}),
//   };
// }
function getAuthHeaders(isMultipart = false) {
  const token = localStorage.getItem("token");
  return isMultipart
    ? { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` ,'Cache-Control': 'no-cache'}
    : { "Content-Type": "application/json", Authorization: `Bearer ${token}`,'Cache-Control': 'no-cache' };
}
export default {
  async getAll() {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  async add(project) {
    const formData = new FormData();

    // Only append File objects
    if (project.imageFile) {
    formData.append('image', project.imageFile);
  }

    formData.append("title", project.title || "");
    formData.append("description", project.description || "");
    formData.append("tech_stack", project.tech_stack || "");
    formData.append("link", project.link || "");
    formData.append("github", project.github || "");
    if (project.from_date) formData.append("from_date", project.from_date);
    if (project.to_date) formData.append("to_date", project.to_date);
    formData.append("is_current", project.is_current ? 1 : 0);
    formData.append("order_no", project.order_no || 0);

    const response = await axios.post(`${API_URL}/add`, formData, {
      headers: getAuthHeaders(true),
    });

    return response.data;
},

async update(id, project) {
  const formData = new FormData();

  if (project.imageFile) {
    formData.append('image', project.imageFile);
  }

  formData.append("title", project.title || "");
  formData.append("description", project.description || "");
  formData.append("tech_stack", project.tech_stack || "");
  formData.append("link", project.link || "");
  formData.append("github", project.github || "");
  if (project.from_date) formData.append("from_date", project.from_date);
  if (project.to_date) formData.append("to_date", project.to_date);
  formData.append("is_current", project.is_current ? 1 : 0);
  formData.append("order_no", project.order_no || 0);

  const response = await axios.put(`${API_URL}/edit/${id}`, formData, {
    headers: getAuthHeaders(true),
  });

  return response.data;
},

  async delete(id) {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};
