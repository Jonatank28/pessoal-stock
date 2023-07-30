'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'

export interface User {
    email: string
    userID: number
}

export interface Toast {
    status: boolean
    message: string
}

export interface AuthContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    toast: Toast | null
    setToast: React.Dispatch<React.SetStateAction<Toast | null>>
    errorLogin: boolean | null
    setErrorLogin: React.Dispatch<React.SetStateAction<boolean | null>>
    login: (data: FormData) => void
    logout: () => void
}

const authContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [errorLogin, setErrorLogin] = useState<boolean | null>(false)
    const [toast, setToast] = useState<Toast | null>(null)
    const router = useRouter()

    //! Login do usuário
    const login = async (data: FormData) => {
        try {
            const response = await api.post('auth/login', data)
            if (response.status === 201) {
                const userData = response.data as User
                setUser(userData)
                localStorage.setItem('@stock_user', JSON.stringify(userData))
                router.push('/dashboard')
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                setErrorLogin(true)
                setTimeout(() => {
                    setErrorLogin(false)
                }, 3000)
            } else {
                console.log(error)
            }
        }
    }

    //! Desloga o usuário para a pagina '/login'
    const logout = async () => {
        router.push('/login')
        localStorage.removeItem('@stock_user')
    }

    //! Verifica se o usuário esta logado
    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem('@stock_user')
        if (userFromLocalStorage) {
            const parsedUser = JSON.parse(userFromLocalStorage) as User
            setUser(parsedUser)
        }
        if (!userFromLocalStorage) return router.push('/login')
    }, [])

    const value = {
        user,
        setUser,
        errorLogin,
        setErrorLogin,
        toast,
        setToast,
        login,
        logout,
    }

    return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export { authContext, AuthProvider }
