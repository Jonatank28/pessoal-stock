import React from 'react'
import { CardsOptionsProps } from '@/types/cardsOptions'

const Card = ({ id, title, value, color, icon }: CardsOptionsProps) => {
    return (
        <div
            className={`flex justify-between items-center gap-6 p-8 rounded-lg w-full bg-secondary cursor-pointer shadow-2xl
        ${
            id === 1
                ? parseInt(value) < 0
                    ? 'bg-red-600/5 shadow-red-800 shadow-sm'
                    : parseInt(value) > 0
                    ? 'bg-green-600/5 shadow-green-800 shadow-sm'
                    : ''
                : ''
        }
        `}
        >
            <div className="flex flex-col gap-4">
                <div>
                    <span>{title}</span>
                </div>
                <div>
                    <span>
                        R$ <span>{value}</span>
                    </span>
                </div>
            </div>
            <div className="text-4xl" style={{ color: color }}>
                {icon}
            </div>
        </div>
    )
}

export default Card
