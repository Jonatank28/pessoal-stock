import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/services/api'
import useAuth from '@/hooks/useAuth'

interface BalanceGlobal {
    revenue: string
    expense: string
    currentBalance: string
}

interface Transaction {
    transactionID: number
    description: string
    day_date: string
    value: number
    tagID: string
    typeID: string
}

interface Tag {
    id: number
    name: string
}

interface Type {
    id: number
    name: string
}

export interface TransactionsGroup {
    day: string
    revenue: string
    expense: string
    currentBalance: string
    transactions: Transaction[]
}

interface DataInitial {
    balanceGlobal: BalanceGlobal | null
    transactionsGroup: TransactionsGroup | null
    tags: Tag[]
    types: Type[]
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

    const formatValue = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

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

            const transactionsGroup: TransactionsGroup =
                response.data.transactionsGroup

            const tags: Tag[] = response.data.tags
            const types: Type[] = response.data.types

            setBalance({
                balanceGlobal,
                transactionsGroup,
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
