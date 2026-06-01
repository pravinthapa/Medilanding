import api from './axios';

export const getDoctors = async () => {
  const { data } = await api.get('/doctors');
  return data;
};

export const getDoctor = async (id) => {
  const { data } = await api.get(`/doctors/${id}`);
  return data;
};

export const createDoctor = async (formData) => {
  const { data } = await api.post('/doctors', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateDoctor = async (id, formData) => {
  const { data } = await api.put(`/doctors/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteDoctor = async (id) => {
  const { data } = await api.delete(`/doctors/${id}`);
  return data;
};
