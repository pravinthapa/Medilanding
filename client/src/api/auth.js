import api from './axios';

export const getRegisterStatus = async () => {
  const { data } = await api.get('/auth/register-status');
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const googleAuth = async (credential) => {
  const { data } = await api.post('/auth/google', { credential });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};
