import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const calculatePercentage = (value, total) =>
    ((value / total) * 100).toFixed(2) + '%'

const PieChart = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

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
