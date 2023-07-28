import { useContext } from 'react'
import { authContext, AuthContextType } from '@/context/auth'

const useAuth = (): AuthContextType => {
    return useContext(authContext)
}

export default useAuth
