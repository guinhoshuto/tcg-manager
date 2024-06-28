import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserContextType {
    user: User | null
    collection: Collection[]
}

interface Collection{
  code_variant: string,
  qtd: number
}

interface User{
    email: string
    id: string
}

const UserContext = createContext<UserContextType | undefined>(undefined)
const supabase = createClient()

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [collection, setCollection] = useState<Collection[]>([])

    useEffect(() => {
        supabase.auth.getUser()
        .then(res => {
            const { data } = res
            if(data.user) {
                setUser({
                    email: data.user!.email!,
                    id: data.user!.id,
                })
            }
        })
    }, [])

    useEffect(() => {
        if(!user) return
        getUserCollection(user.id).then(data => {
            setCollection(data)
        })
    }, [user])
    
    async function getUserCollection(userId: string) {
        if (!user) return;
        const res = await fetch(`/api/user/${userId}/collection`);
        const data = await res.json();
        return data;
    }

    return (
        <UserContext.Provider value={{ user, collection }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext)
    if(context === undefined){
        throw new Error('D:')
    }
    return context
}