import React, { useState } from 'react'

interface InputProps {
    register: any
    errors: any
    name: string
    type?: string
    mask?: string
    required?: boolean
    label: string
    minLength?: number
    maxLength?: number
}

const Input: React.FC<InputProps> = ({
    register,
    errors,
    name,
    type = 'string',
    required,
    mask,
    label,
    minLength,
    maxLength,
}) => {
    const hasMinLengthError = errors[name]?.type === 'minLength'
    const [formattedValue, setFormattedValue] = useState('')

    const applyMaskMoney = (value: string) => {
        if (mask === 'money') {
            value = value.replace(/\D/g, '')
            value = (Number(value) / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
        }
        return value
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const formattedValue = applyMaskMoney(value)
        setFormattedValue(formattedValue)
        e.target.value = formattedValue
        e.currentTarget.dispatchEvent(new Event('input', { bubbles: true }))
    }

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                maxLength={maxLength}
                {...register(name, {
                    required,
                    minLength: minLength || undefined,
                })}
                onChange={handleChange}
                value={formattedValue}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors[name] && (
                <div className="text-red-500 text-xs">
                    {required && errors[name]?.type === 'required'
                        ? 'Campo obrigatório'
                        : hasMinLengthError
                        ? `Mínimo de ${minLength} caracteres`
                        : null}
                </div>
            )}
        </div>
    )
}

export default Input
