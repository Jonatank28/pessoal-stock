const formatValue = (value: string) => {
    const numericValue = value.replace(/[^\d,]/g, '')
    const formattedValue = numericValue.replace(',', '.')
    const valueNumber = parseFloat(formattedValue)
    return Math.round(valueNumber * 100) / 100
}

export { formatValue }
