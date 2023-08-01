const formatValue = (value: string) => {
    const numericValue = value.replace(/[^\d,]/g, '')
    const formattedValue = numericValue.replace(',', '.')
    const valueNumber = Number(formattedValue)
    const formattedNumber = valueNumber.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    return formattedNumber
}

export { formatValue }
