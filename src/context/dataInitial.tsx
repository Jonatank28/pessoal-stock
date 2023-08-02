import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/services/api'

interface FormattedDataInitial {
    revenue: string
    expense: string
    currentBalance: string
}

export interface DataInitialContextType {
    balance: FormattedDataInitial | null
    setBalance: React.Dispatch<
        React.SetStateAction<FormattedDataInitial | null>
    >
    getDataInitial: () => void
}

const dataInitialContext = createContext<DataInitialContextType>(
    {} as DataInitialContextType
)

interface DataInitialProviderProps {
    children: ReactNode
}

const DataInitialProvider: React.FC<DataInitialProviderProps> = ({
    children,
}) => {
    const [balance, setBalance] = useState<FormattedDataInitial | null>(null)

    // Formata para a moeda pt-br
    const formatValue = (value: number): string => {
        return value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    // Requisição ao back para buscar dados atualizados sobre o balanço de caixa
    const getDataInitial = async () => {
        try {
            const response = await api.get('dataInitial')
            const formattedData: FormattedDataInitial = {
                revenue: formatValue(response.data.revenue),
                expense: formatValue(response.data.expense),
                currentBalance: formatValue(response.data.currentBalance),
            }
            setBalance(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getDataInitial()
    }, [])

    const value: DataInitialContextType = {
        balance,
        setBalance,
        getDataInitial,
    }

    return (
        <dataInitialContext.Provider value={value}>
            {children}
        </dataInitialContext.Provider>
    )
}

export { dataInitialContext, DataInitialProvider }
