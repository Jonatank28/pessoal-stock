import IconThreeDots from '@/icon/IconThreeDots'
import useAuth from '@/hooks/useAuth'
import TogleThemes from './TogleThemes'

interface Props {
    menuOpen: boolean
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UserOptions = ({ menuOpen, setMenuOpen }: Props) => {
    const { logout } = useAuth()
    return (
        <div className="flex items-center px-4 py-1 gap-4">
            <TogleThemes className="" />
            <img
                className="w-6 h-6 rounded-full"
                src="https://github.com/Jonatank28.png"
                alt="Foto de perfil"
            />
            <div className="relative">
                <IconThreeDots
                    className="text-4xl cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
                {menuOpen && (
                    <div className="absolute top-8 right-0 bg-secondary py-2 rounded-lg w-[120px] flex flex-col items-end ">
                        <div
                            className="bg-gray-600/10 hover:bg-gray-600/30 px-4 cursor-pointer w-full"
                            onClick={logout}
                        >
                            <span className="text-sm">Sair</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserOptions
