import React from 'react'
import { CardsOptionsProps } from '@/types/cardsOptions'

const Card = ({ title, value, icon }: CardsOptionsProps) => {
    return (
        <div className="flex justify-between items-center gap-6 p-4 rounded-lg w-[300px] bg-secundary">
            <div className="flex flex-col gap-2">
                <div>
                    <span>{title}</span>
                </div>
                <div>
                    <span>R$ {value}</span>
                </div>
            </div>
            <div className="text-2xl">{icon}</div>
        </div>
    )
}

export default Card
