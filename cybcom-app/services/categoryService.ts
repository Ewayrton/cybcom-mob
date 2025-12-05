import api from '@/services/api';

export type category = {
  id: number,
  name: string,
  slug: string,
  description: string
}

export const categoryService = {
  findAll: async (): Promise<Array<category>> => {
    const { data } = await api.get('/categories');
    return data;
  },
};