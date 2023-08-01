'use client'
import useAuth from '@/hooks/useAuth'

const page = () => {
    const { user } = useAuth()
    return user && <div className="lp w-full h-full"></div>
}

export default page
