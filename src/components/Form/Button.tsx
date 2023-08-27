import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    title: string
    className?: string
    type: 'button' | 'submit' | 'reset'
    onClick?: () => void
}

const Button = ({ title, className, type, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={twMerge(
                `px-2 border-none text-white  transition-colors shadow-2x1 rounded-lg p-2 ${className}`
            )}
        >
            {title}
        </button>
    )
}

export default Button
