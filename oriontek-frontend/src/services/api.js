import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = {
  getClients: () => axios.get(`${API_URL}/clients`),
  getClient: (id) => axios.get(`${API_URL}/clients/${id}`),
  createClient: (data) => axios.post(`${API_URL}/clients`, data),
  updateClient: (id, data) => axios.put(`${API_URL}/clients/${id}`, data),
  deleteClient: (id) => axios.delete(`${API_URL}/clients/${id}`),
  getAddresses: (clientId) => axios.get(`${API_URL}/clients/${clientId}/addresses`),
  createAddress: (clientId, data) => axios.post(`${API_URL}/clients/${clientId}/addresses`, data),
  updateAddress: (clientId, addressId, data) => 
    axios.put(`${API_URL}/clients/${clientId}/addresses/${addressId}`, data),
  deleteAddress: (clientId, addressId) => 
    axios.delete(`${API_URL}/clients/${clientId}/addresses/${addressId}`)
};

export default api;