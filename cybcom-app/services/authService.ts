import api from '@/services/api';

export const authService = {
  // Login
  signIn: async (email: string, password: string) => {
    // Rota: /signin
    const { data } = await api.post('/auth/signin', { email, password });
    return data;
  },

  // Cadastro
  register: async (name: string, email: string, password: string) => {
    // Rota: /signup
    const { data } = await api.post('/auth/signup', { 
      name: name,
      password: password,
      email: email
    });
    return data;
  }
};