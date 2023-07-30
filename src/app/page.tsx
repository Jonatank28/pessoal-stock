'use client'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const user = localStorage.getItem('@stock_user')
    return user ? router.push('/dashboard') : router.push('/login')
}

export default page
