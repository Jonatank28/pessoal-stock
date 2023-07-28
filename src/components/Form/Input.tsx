interface InputProps {
    register: any
    errors: any
    name: string
    type: string
    required: boolean
    label: string
    minLength?: number
}

const Input: React.FC<InputProps> = ({
    register,
    errors,
    name,
    type,
    required,
    label,
    minLength,
}) => {
    const hasMinLengthError = errors[name]?.type === 'minLength'

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                maxLength={30}
                {...register(name, {
                    required,
                    minLength: minLength || undefined,
                })}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors[name] && (
                <div className="text-red-500 text-sm">
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
