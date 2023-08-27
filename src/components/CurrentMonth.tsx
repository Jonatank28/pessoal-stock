import { useEffect, useState } from 'react'
import useDataInitial from '@/hooks/useDataInitial'
import { Months } from '@/context/dataInitial'
import useAuth from '@/hooks/useAuth'

const CurrentMonth = () => {
    const { user } = useAuth()
    const {
        balance,
        getDataInitial,
        setCurrentMonthActive,
        currentMonthActive,
    } = useDataInitial()

    const [open, setOpen] = useState<boolean>(false)

    // Seleciona um novo mes
    const handleClickOptionSelected = (row: Months) => {
        const data = {
            ...user,
            month_number: row.month_number,
            year: row.year,
        }
        setCurrentMonthActive(row)
        setOpen(false)
        getDataInitial(data)
    }

    useEffect(() => {
        if (balance) {
            setCurrentMonthActive(balance?.months[0])
        }
    }, [])

    return (
        <div className="relative">
            <button
                className="border cursor-pointer border-b-gray-500 flex justify-center items-center p-1 rounded-xl bg-secundary text-primary transition-colors py-1"
                onClick={() => setOpen(!open)}
            >
                {currentMonthActive?.month_name}
            </button>
            {open && (
                <div className="absolute top-8 p-[1px] py-1 rounded-lg bg-secondary flex flex-col gap-1">
                    {balance?.months.map((row: Months, index: any) => (
                        <p
                            key={index}
                            className="hover:bg-primary p-1 cursor-pointer rounded-lg"
                            onClick={() => handleClickOptionSelected(row)}
                        >
                            {row.month_name}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CurrentMonth
