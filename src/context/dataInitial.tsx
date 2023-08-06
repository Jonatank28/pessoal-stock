'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/services/api'
import useAuth from '@/hooks/useAuth'

interface BalanceGlobal {
    revenue: string
    expense: string
    currentBalance: string
}
export interface Transaction {
    transactionID: number
    value: number
    description: string
    day_date: string
    creationDate: string
    typeID: string
    tagID: string
}

interface type {
    id: number
    name: string
}

interface tag {
    id: number
    name: string
}

interface DataInitial {
    balanceGlobal: BalanceGlobal | null
    transactions: Transaction[] | null
    tags: tag[]
    types: type[]
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
    const { user } = useAuth()

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
            const response = await api.post('dataInitial', { data: user })
            const balanceGlobal: BalanceGlobal | null = response.data
                .balanceGlobal
                ? {
                      revenue: formatValue(response.data.balanceGlobal.revenue),
                      expense: formatValue(response.data.balanceGlobal.expense),
                      currentBalance: formatValue(
                          response.data.balanceGlobal.currentBalance
                      ),
                  }
                : null

            const transactions: Transaction[] = response.data.transactions.map(
                (row: Transaction) => ({
                    ...row,
                    value: formatValue(row.value),
                })
            )

            const tags: tag[] = response.data.tags
            const types: type[] = response.data.types

            setBalance({
                balanceGlobal,
                transactions,
                tags,
                types,
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (user) {
            getDataInitial()
        }
    }, [user])

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
