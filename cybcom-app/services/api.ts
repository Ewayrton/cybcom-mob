import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IP da rede Wi-Fi (Adaptador Wi-Fi)
const BASE_URL = 'http://192.168.0.240:8080'; 

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para adicionar o Token automaticamente
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