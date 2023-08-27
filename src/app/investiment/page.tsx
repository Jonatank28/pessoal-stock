'use client'
import Card from '@/components/Card'
import Cards from '@/data/CardsMobills'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import CurrentMonth from '@/components/CurrentMonth'
import UserOptions from '@/components/UserOptions'
import Button from '@/components/Form/Button'

const Invest = () => {
    const cards = Cards()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const { user } = useAuth()

    return (
        user && (
            <>
                <main className="p-4 pl-12">
                    <Button
                        title="Novo registro"
                        className="fixed bottom-4 right-6 w-auto primary"
                        type="button"
                        onClick={{}}
                    />
                    <div className="flex justify-between">
                        <div></div>
                        <CurrentMonth />
                        <UserOptions
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                        />
                    </div>
                    <div className="pt-6">
                        <h1 className="font-bold text-xl">Invest</h1>
                    </div>
                    {/* Cards do header que contem o balanço atual */}
                    <section className="grid grid-cols-3 pt-6 gap-4">
                        {cards.map((card) => (
                            <Card
                                key={card.id}
                                title={card.title}
                                value={card.value}
                                icon={card.icon}
                                color={card.color}
                                id={card.id}
                            />
                        ))}
                    </section>
                </main>
            </>
        )
    )
}
export default Invest
