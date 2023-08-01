import { CurrentMonthProps } from '@/types/CurrentMonth'
import { useState } from 'react'

const CurrentMonth = () => {
    const data = [
        {
            id: 1,
            month: 'Julho',
            year: 2023,
        },
        {
            id: 2,
            month: 'Agosto',
            year: 2023,
        },
        {
            id: 3,
            month: 'Setembro',
            year: 2023,
        },
    ]

    const [currentMonthActive, setCurrentMonthActive] = useState(data[0])
    const [open, setOpen] = useState<boolean>(false)

    // Seleciona um novo mes
    const handleClickOptionSelected = (row: CurrentMonthProps) => {
        setCurrentMonthActive(row)
        setOpen(false)
    }

    return (
        <div className="relative">
            <button
                className="border cursor-pointer border-b-gray-500 flex justify-center items-center p-1 rounded-xl bg-secundary text-primary transition-colors py-1"
                onClick={() => setOpen(!open)}
            >
                {currentMonthActive.month}
            </button>
            {open && (
                <div className="absolute top-8 p-[1px] py-1 rounded-lg bg-secondary flex flex-col gap-1">
                    {data.map((row) => (
                        <p
                            key={row.id}
                            className="hover:bg-primary p-1 cursor-pointer rounded-lg"
                            onClick={() => handleClickOptionSelected(row)}
                        >
                            {row.month}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CurrentMonth
