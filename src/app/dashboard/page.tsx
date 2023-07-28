'use client'
import Card from '@/components/Card'
import Cards from '@/data/Cards'
import IconThreeDots from '@/icon/IconThreeDots'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const cards = Cards()
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()

    const handleClick = () => {
        router.push('login')
    }

    return (
        <main className="p-4 pl-12 lp w-full h-full">
            <div className="flex justify-between">
                <div></div>
                <div className="border border-b-gray-500 px-4 py-1 rounded-xl bg-white">
                    <p className="text-gray-400">Abril</p>
                </div>
                <div className="flex items-center px-4 py-1 gap-4">
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
                            <div className="absolute top-8 right-0 bg-secundary py-2 rounded-lg w-[120px] flex flex-col items-end ">
                                <div
                                    className="bg-gray-600/10 hover:bg-gray-600/30 px-4 cursor-pointer w-full"
                                    onClick={handleClick}
                                >
                                    <span className="text-sm">Sair</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="pt-6">
                <h1 className="font-bold text-xl">Dashboard</h1>
            </div>
            <section className="grid grid-cols-4 pt-6 gap-4">
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                    />
                ))}
            </section>
        </main>
    )
}
export default Dashboard
