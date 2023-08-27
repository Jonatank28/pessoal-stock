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
export interface Months {
    month_number: string
    month_name: string
    year: string
}

interface Type {
    id: number
    name: string
}

export interface TransactionsGroup {
    day: string
    revenue: number
    expense: number
    net_amount: number
    currentBalance: string
    transactions: Transaction[]
}

interface DataInitial {
    balanceGlobal: BalanceGlobal | null
    transactionsGroup: TransactionsGroup | null
    tags: Tag[]
    types: Type[]
    months: Months[]
}

interface DataInitialContextType {
    balance: DataInitial | null
    setBalance: React.Dispatch<React.SetStateAction<DataInitial | null>>
    currentMonthActive: Months | null
    setCurrentMonthActive: React.Dispatch<React.SetStateAction<Months | null>>
    getDataInitial: (params: any) => Promise<void>
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
    const [currentMonthActive, setCurrentMonthActive] = useState<Months | null>(
        null
    )

    const formatValue = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    const getDataInitial = async (paramns: any) => {
        try {
            const response = await api.post('dataInitial', { data: paramns })
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
                months: response.data.months,
            })
        } catch (err) {
            console.error(err)
        }
    }

    const value: DataInitialContextType = {
        balance,
        setBalance,
        setCurrentMonthActive,
        currentMonthActive,
        getDataInitial,
    }

    return (
        <dataInitialContext.Provider value={value}>
            {children}
        </dataInitialContext.Provider>
    )
}

export { dataInitialContext, DataInitialProvider }
