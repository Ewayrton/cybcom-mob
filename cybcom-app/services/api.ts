import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL de Produção (Vercel)
const BASE_URL = 'https://backend-cyb-com.vercel.app'; 

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para enviar o token automaticamente se o usuário estiver logado
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('@cybcom:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Erro ao recuperar token", error);
  }
  return config;
});

export default api;