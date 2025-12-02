import axios from 'axios'
import 'dotenv/config'

const URL_BASE = `${process.env.API_URL}/users`

const userServices = {
    
    findById: (id: string, setUser: CallableFunction)=>{
        // let token; -> após sistema de login funcionando
        let res = axios.get(`${URL_BASE}/${id}`, { // -> após autenticação em funcionamento, o filtro será pelo token
            // headers: {Authorization: `Bearer ${token}`} -> após sistema de login funcionando
        }).then((res)=>{
            return res.data
        })

        setUser(res)
    }
}

export default userServices;