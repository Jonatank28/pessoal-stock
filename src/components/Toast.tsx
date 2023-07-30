import useAuth from '@/hooks/useAuth'

const Toast = ({}) => {
    const { toast } = useAuth()

    return toast?.status ? (
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-4 bg-green-500 text-white px-4 py-2 rounded shadow">
            <p className="text-sm">{toast.message}</p>
        </div>
    ) : null
}

export default Toast
