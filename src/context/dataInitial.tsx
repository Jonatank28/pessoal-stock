import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/services/api'

interface BalanceGlobal {
    revenue: string
    expense: string
    currentBalance: string
}
interface Transaction {
    transactionID: number
    value: number
    description: string
    creationDate: string
    typeID: number
    tagID: number
}

interface DataInitial {
    balanceGlobal: BalanceGlobal
    transactions: Transaction[]
}

export interface DataInitialContextType {
    balance: DataInitial | null
    setBalance: React.Dispatch<React.SetStateAction<DataInitial | null>>
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
    const [balance, setBalance] = useState<DataInitial | null>(null)

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
            const balanceGlobal: BalanceGlobal = {
                revenue: formatValue(response.data.balanceGlobal.revenue),
                expense: formatValue(response.data.balanceGlobal.expense),
                currentBalance: formatValue(
                    response.data.balanceGlobal.currentBalance
                ),
            }
            const transactions: Transaction[] = response.data.transactions

            setBalance({
                transactions,
                balanceGlobal,
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getDataInitial()
    }, [])

    console.log('🚀 ~ balance:', balance)

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
