'use client'
import PieChart from '@/components/chart/PieChart'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'

export interface chartPie {
    tag: string
    valueTotal: number
    percentage: number
}

interface chartData {
    chartPie: chartPie[]
}

const Page = () => {
    const { user } = useAuth()
    const [chartData, setChartData] = useState<chartData | null>(null)

    const getData = async () => {
        try {
            if (user) {
                const response = await api.get(`graphics/${user?.userID}`)
                setChartData(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) {
            getData()
        }
    }, [user])

    return (
        <main className="p-8">
            <h1 className="font-bold text-xl">Gráficos</h1>
            {chartData ? (
                <PieChart data={chartData.chartPie} />
            ) : (
                <div>Loading...</div>
            )}
        </main>
    )
}

export default Page
