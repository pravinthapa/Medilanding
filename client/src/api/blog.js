import api from './axios';

export const getBlogPosts = async () => {
  const { data } = await api.get('/blog');
  return data;
};

export const getBlogPost = async (slugOrId) => {
  const { data } = await api.get(`/blog/${slugOrId}`);
  return data;
};

export const createBlogPost = async (payload) => {
  const { data } = await api.post('/blog', payload);
  return data;
};

export const updateBlogPost = async (id, payload) => {
  const { data } = await api.put(`/blog/${id}`, payload);
  return data;
};

export const deleteBlogPost = async (id) => {
  const { data } = await api.delete(`/blog/${id}`);
  return data;
};
