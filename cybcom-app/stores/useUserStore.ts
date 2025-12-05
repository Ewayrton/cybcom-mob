import { create } from "zustand"

type Post = {
    id: number,
    title: string,
    content: string
}

export interface dataUser {
    name: string,
    email: string,
    website: string | null,
    github: string | null,
    linkedin: string | null,
    Posts: Array<Post> | []
}

interface userState {
    isLoading: boolean
    user: dataUser | null,
    setUser: (user: dataUser) => void
} 

export const useUserStore = create<userState>((set)=>({
    user: null,
    isLoading: true,
    setUser: (user: dataUser)=>{
        set({user: user, isLoading: false})
    }
}))