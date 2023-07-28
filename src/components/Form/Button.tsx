import React from 'react'

interface Props {
    title: string
}

const Button = ({ title }: Props) => {
    return (
        <button
            type="submit"
            className="w-full border-none bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-2x1 rounded-lg p-2"
        >
            {title}
        </button>
    )
}

export default Button
