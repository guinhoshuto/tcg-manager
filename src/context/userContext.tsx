import React, { createContext, useContext, ReactNode, useState } from "react";

interface UserContextType {
    user: string
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState('oi')

    return (
        <UserContext.Provider value={{ user}}>
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