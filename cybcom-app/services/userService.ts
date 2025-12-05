import axios from "axios";
import { dataUser } from "@/stores/useUserStore";

const URL_BASE = `${process.env.API_URL}/users`;

const userServices = {
  findById: (id: string, setUser: CallableFunction) => {
    // let token; -> após sistema de login funcionando
    let res = axios
      .get(`${URL_BASE}/${id}`, {
        // -> após autenticação em funcionamento, o filtro será pelo token
        // headers: {Authorization: `Bearer ${token}`} -> após sistema de login funcionando
      })
      .then((res) => {
        return res.data;
      });

    setUser(res);
  },
  updateProfile: async (
    id: string,
    userData: Partial<dataUser> & { avatar: string }
  ) => {
    // Obter o token de autenticação aqui

    // A propriedade 'id' deve ser substituída pela obtenção do ID do usuário logado (e.g., via useAuthStore)
    const response = await axios.put(`${URL_BASE}/${id}`, userData, {
      // headers: { Authorization: `Bearer ${token}` }
    });

    return response.data; // Retorna os dados atualizados
  },
};

export default userServices;
