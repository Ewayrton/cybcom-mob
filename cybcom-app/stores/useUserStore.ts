import { create } from "zustand"

export interface dataUser {
    name: string,
    email: string,
    website: string | null,
    github: string | null,
    linkedin: string | null
}

export const useUserStore = create((set)=>{
    user: null

    setUser: (user: dataUser)=>{
        set({user: user})
    }
})