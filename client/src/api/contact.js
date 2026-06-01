import api from './axios';

export const createContact = async (payload) => {
  const { data } = await api.post('/contact', payload);
  return data;
};

export const getContacts = async () => {
  const { data } = await api.get('/contact');
  return data;
};

export const updateContact = async (id, payload) => {
  const { data } = await api.put(`/contact/${id}`, payload);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await api.delete(`/contact/${id}`);
  return data;
};
