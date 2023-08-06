import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { chartPie } from '@/app/graficos/page'

const generateRandomColors = (numColors: number) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        colors.push(color)
    }
    return colors
}

interface PieChartProps {
    data: chartPie[]
}

const PieChart = ({ data }: PieChartProps) => {
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [chartData, setChartData] = useState<any>(null)

    useEffect(() => {
        if (data) {
            const series = data.map((item) => item.valueTotal)
            const labels = data.map((item) => item.tag)
            const colors = generateRandomColors(data.length)

            setChartData({
                series,
                options: {
                    chart: {
                        type: 'pie',
                    },
                    labels,
                    colors,
                    legend: {
                        show: true,
                    },
                    tooltip: {
                        y: {
                            formatter: function (value: number) {
                                return value.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    minimumFractionDigits: 2,
                                })
                            },
                        },
                    },
                },
            })

            setIsDataLoaded(true)
        }
    }, [data])

    return (
        isDataLoaded &&
        chartData && (
            <div className=" bg-black/30 p-3 rounded-lg mt-4">
                <h2 className="text-lg">Por tag</h2>
                <ReactApexChart
                    options={chartData.options as ApexCharts.ApexOptions}
                    series={chartData.series}
                    type="pie"
                    width={500}
                    height={500}
                />
            </div>
        )
    )
}

export default PieChart
