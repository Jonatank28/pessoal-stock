'use client'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import PieChart from '@/components/chart/PieChart'

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
                <div className=" bg-black/80 p-3 rounded-lg mt-4">
                    <h2 className="text-lg text-primary">Por tag</h2>
                    <PieChart data={chartData.pie} />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    )
}

export default Page
