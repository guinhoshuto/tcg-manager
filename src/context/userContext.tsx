import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserContextType {
    user: User | null
    handleUpdateCollection: (code_variant: string, qtd: number) => void
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
        getUserCollection(user.id)
    }, [user])
    
    async function getUserCollection(userId: string) {
        if (!user) return;
        const res = await fetch(`/api/user/${userId}/collection`);
        const data = await res.json();
        setCollection(data)
    }
    async function handleUpdateCollection(code_variant: string, qtd: number){
        if(!user) return
        fetch(`/api/user/${user.id}/collection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code_variant,
                qtd
            })
        }).then(() => getUserCollection(user.id))
    }

    return (
        <UserContext.Provider value={{ user, collection, handleUpdateCollection }}>
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