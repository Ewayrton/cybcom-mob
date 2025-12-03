import api from '@/services/api';

export const authService = {
  // Login
  signIn: async (email: string, password: string) => {
    // Rota: /auth/signin
    const { data } = await api.post('/auth/signin', { email, password });
    return data;
  },

  // Cadastro
  register: async (username: string, email: string, password: string) => {
    // Rota: /auth/signup
    const { data } = await api.post('/auth/signup', { 
      username, 
      email, 
      password 
    });
    return data;
  }
};