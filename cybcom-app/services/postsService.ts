import api from '../services/api';

export interface Post {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    username?: string;
    avatar?: string;
  };
  category: {
    id: number;
    name: string;
  };
}

export interface CreatePostDTO {
  title: string;
  content: string;
  categoryId: number;
  image_url?: string;
}

// Exportação no singular para combinar com o arquivo
export const postsService = { 
  getAll: async () => {
    const { data } = await api.get<Post[]>('/posts');
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<Post>(`/posts/${id}`);
    return data;
  },

  create: async (postData: CreatePostDTO) => {
    const { data } = await api.post<Post>('/posts', postData);
    return data;
  },

  delete: async (id: number) => {
    await api.delete(`/posts/${id}`);
  }
};