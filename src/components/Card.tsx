import React from 'react'
import { CardsOptionsProps } from '@/types/cardsOptions'

const Card = ({ id, title, value, color, icon }: CardsOptionsProps) => {
    return (
        <div className="flex justify-between items-center gap-6 p-8 rounded-lg w-full bg-secondary cursor-pointer">
            <div className="flex flex-col gap-4">
                <div>
                    <span>{title}</span>
                </div>
                <div>
                    <span>
                        R${' '}
                        <span
                            className={
                                id === 1
                                    ? parseInt(value) < 0
                                        ? 'text-red-500'
                                        : parseInt(value) > 0
                                        ? 'text-green-600'
                                        : ''
                                    : ''
                            }
                        >
                            {value}
                        </span>
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
