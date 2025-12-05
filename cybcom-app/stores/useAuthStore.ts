import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Tokens = {
  access: string;
  refresh: string;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  signIn: (tokens: Tokens) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isLoading: false,

      signIn: (tokens) =>
        set({
          accessToken: tokens.access,
          refreshToken: tokens.refresh,
        }),

      signOut: () =>
        set({
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'auth-storage', // nome da chave no AsyncStorage
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);
