import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("EXPO_PUBLIC_API_URL não definida no .env");
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const storage = await AsyncStorage.getItem('auth-storage');

    if (storage) {
      const parsed = JSON.parse(storage);
      const token = parsed?.state?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.error("Erro ao recuperar token", error);
  }

  return config;
});

export default api;
