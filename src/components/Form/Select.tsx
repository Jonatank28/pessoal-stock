import React from 'react'

interface SelectProps {
    register: any
    errors: any
    name: string
    options: options[] | undefined
    required?: boolean
    label: string
}

interface options {
    id: number
    name: string
}

const Select: React.FC<SelectProps> = ({
    register,
    errors,
    name,
    options,
    required,
    label,
}) => {
    const sortedOptions = options
        ?.slice()
        .sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                {...register(name, { required })}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
                <option value="" disabled selected>
                    Selecione
                </option>
                {sortedOptions?.map((option: options) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <div className="text-red-500 text-xs">Campo obrigatório</div>
            )}
        </div>
    )
}

export default Select
