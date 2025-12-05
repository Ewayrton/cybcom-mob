import api from '@/services/api';

type Tokens = {
  access: string,
  refresh: string
}
export const authService = {
  // Login
  signIn: async (email: string, password: string): Promise<Tokens> => {
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