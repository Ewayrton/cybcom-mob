import { create } from 'zustand';
// CORREÇÃO: Importando do arquivo no singular 'postsService'
import { postsService, Post } from '@/services/postsService'; 

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Usando a constante importada corretamente
      const data = await postsService.getAll();
      set({ posts: data, isLoading: false });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Erro ao carregar posts' 
      });
      console.error(error);
    }
  },

  addPost: (newPost) => set((state) => ({ 
    posts: [newPost, ...state.posts] 
  })),
}));