import api from "./api"
import { dataUser } from "@/stores/useUserStore";

const userServices = {
  findById:async () => {
    let {data} = await api.get<dataUser>('/users')
    return data
  },
  updateProfile: async (
    userData: Partial<dataUser> & { avatar: string }
  ) => {

    const response = await api.put(`/users`, userData);

    return response.data;
  },
};

export default userServices;
