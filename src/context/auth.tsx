import React, { createContext, useState, ReactNode } from 'react'
import { api } from '@/services/api'

export interface AuthContextType {
    isAuthenticated: boolean
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    login: (data: FormData) => void
}

const authContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuthenticated: () => {},
    login: (data: FormData) => {},
})

interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)

    const login = async (data: FormData) => {
        await api
            .post('auth/login', data)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => console.log(error))
    }

    const value = {
        setAuthenticated,
        isAuthenticated,
        login,
    }

    return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export { authContext, AuthProvider }
