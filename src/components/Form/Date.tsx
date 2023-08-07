import React from 'react'

interface DateInputProps {
    register: any
    errors: any
    name: string
    required?: boolean
    label: string
    defaultValue?: string
}

const DateInput: React.FC<DateInputProps> = ({
    register,
    errors,
    name,
    required,
    label,
    defaultValue,
}) => {
    const currentDate = new Date().toISOString().slice(0, 10)

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type="date"
                defaultValue={defaultValue || currentDate}
                {...register(name, {
                    required,
                })}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors[name] && (
                <div className="text-red-500 text-xs">
                    {required && errors[name]?.type === 'required'
                        ? 'Campo obrigatório'
                        : null}
                </div>
            )}
        </div>
    )
}

export default DateInput
