import api from './axios';

export const createAppointment = async (payload) => {
  const { data } = await api.post('/appointments', payload);
  return data;
};

export const getAppointments = async (status) => {
  const params = status ? { status } : {};
  const { data } = await api.get('/appointments', { params });
  return data;
};

export const getAppointmentStats = async () => {
  const { data } = await api.get('/appointments/stats');
  return data;
};

export const updateAppointment = async (id, payload) => {
  const { data } = await api.put(`/appointments/${id}`, payload);
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await api.delete(`/appointments/${id}`);
  return data;
};
