import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export const getServices = async ({ search = '', category = '', page = 1 } = {}) => {
  const params = new URLSearchParams();
  if (search && search.trim()) params.append('search', search.trim());
  if (category && category !== 'All') params.append('category', category);
  params.append('page', page);
  params.append('limit', 20);

  const res = await axios.get(`${BASE_URL}/services?${params}`);
  const data = res.data;

  // Handle both array response and object response
  if (Array.isArray(data)) {
    return { services: data, total: data.length, pages: 1 };
  }
  return data;
};

export const getServiceById = async (id) => {
  const res = await axios.get(`${BASE_URL}/services/${id}`);
  return res.data;
};

export const getReviews = async (serviceId) => {
  const res = await axios.get(`${BASE_URL}/reviews?serviceId=${serviceId}`);
  return res.data;
};

export const submitReview = async (reviewData) => {
  const res = await axios.post(`${BASE_URL}/reviews`, reviewData);
  return res.data;
};

export const addService = async (serviceData) => {
  const res = await axios.post(`${BASE_URL}/services`, serviceData);
  return res.data;
};