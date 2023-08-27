import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const calculatePercentage = (value, total) =>
    ((value / total) * 100).toFixed(2) + '%'

const PieChart = ({ data }) => {
    const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0)
    const percentages = data.datasets[0].data.map((value) =>
        calculatePercentage(value, total)
    )

    const labelsWithPercentagesAndTotal = data.labels.map((label, index) => {
        const percentage = percentages[index]
        const value = data.datasets[0].data[index]
        return `${label}: ${value} (${percentage})`
    })

    const options = {
        animation: {
            animateScaleRotate: true,
        },
        plugins: {
            legend: {
                position: 'bottom',
                display: true,
            },
        },
    }

    return (
        <div style={{ width: '600px' }}>
            <Pie
                data={{
                    labels: labelsWithPercentagesAndTotal,
                    datasets: data.datasets,
                }}
                options={options}
            />
        </div>
    )
}

export default PieChart
