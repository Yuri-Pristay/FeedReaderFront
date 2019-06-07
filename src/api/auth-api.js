import http from './http';

export const signIn = async (values) => {
  const response = await http.post('/api/auth/signin', values);
  localStorage.setItem('access-token', response.headers['access-token']);
  return response.data.user;
};

export const signOut = () => {
  localStorage.removeItem('access-token');
};
