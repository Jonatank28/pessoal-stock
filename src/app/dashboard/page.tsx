'use client'
import Card from '@/components/Card'
import Cards from '@/data/Cards'

const Dashboard = () => {
    const cards = Cards()

    return (
        <main className="p-4 pl-12 ">
            <div className="flex justify-between">
                <div></div>
                <div className="border border-b-gray-500 px-4 py-1 rounded-xl bg-white">
                    <p>Abril</p>
                </div>
                <div className="flex items-center px-4 py-1 gap-4">
                    <img
                        className="w-6 h-6 rounded-full"
                        src="https://github.com/Jonatank28.png"
                        alt="Foto de perfil"
                    />
                    <p>Icone</p>
                </div>
            </div>
            <div className="pt-6">
                <h1 className="font-bold text-xl">Dashboard</h1>
            </div>
            <section className="flex flex-wrap pt-6 gap-4">
                {cards &&
                    cards.map((card, index) => (
                        <Card
                            key={card.id}
                            title={card.title}
                            value={card.value}
                            icon={card.icon}
                        />
                    ))}
            </section>
        </main>
    )
}
export default Dashboard
