'use client'
import { useState } from 'react'
import MenusSideBar from '@/data/MenusSideBar'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
    const menus = MenusSideBar()
    const [menuActive, setMenuActive] = useState(menus[0].id)
    const router = useRouter()

    const handleClickMenuActive = (id: number, route: string) => {
        setMenuActive(id)
        router.push(route)
    }

    return (
        <div className="w-60 bg-secundary h-screen flex justify-center">
            <div className="p-2 flex flex-col gap-6 w-full mt-7">
                <div className="p-1 bg-primary flex justify-center items-center rounded-md">
                    <h1>LOGO</h1>
                </div>
                <div className="flex flex-col gap-4 pt-12">
                    {menus.map((menu) => (
                        <div
                            key={menu.id}
                            className={`p-2 rounded-lg cursor-pointer ${
                                menuActive === menu.id
                                    ? 'bg-primary shadow-lg shadow-[var(--decoration)]'
                                    : 'bg-primary'
                            }`}
                            onClick={() =>
                                handleClickMenuActive(menu.id, menu.route)
                            }
                        >
                            <p className="text-primary">{menu.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
