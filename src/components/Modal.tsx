interface Props {
    title: string
    message?: string
    isOpen: boolean
    children?: React.ReactNode
}

const Modal = ({ title, message, isOpen, children }: Props) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black/80 opacity-40"></div>
                    {/* Overlay de fundo */}
                    <div className="bg-secondary p-8 rounded-lg shadow-lg relative z-10">
                        <h2 className="text-2xl font-bold mb-4 text-light-100">
                            {title}
                        </h2>
                        <p className="text-xl mb-4 text-light-300">{message}</p>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
