import { useTheme } from "next-themes";


const useLineChartOptions = () => { // Create a custom hook
    const { theme } = useTheme();

    const getTextColor = () => {
        return theme === 'wata-dark' ? '#FFFFFF' : '#000000';
    };

    const lineData = {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        datasets: [
            {
                label: 'Income',
                data: [33, 53, 85, 41, 44, 65, 76, 87, 98, 109, 120, 131],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Expense',
                data: [33, 25, 35, 51, 54, 76, 87, 98, 109, 120, 131, 142],
                fill: true,
                borderColor: '#742774',
            },
        ],
    };

    // Cấu hình cho biểu đồ
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { // Thêm cấu hình cho trục x và y
            x: {
                ticks: {
                    color: getTextColor(), // Màu của nhãn trục x
                },
            },
            y: {
                ticks: {
                    color: getTextColor(), // Màu của nhãn trục y
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                align: 'start' as const,
                labels: {
                    color: getTextColor(), // Sử dụng màu text từ theme
                    font: {
                        size: 14, // Kích thước font chữ
                        weight: 300, // Độ đậm của chữ
                    },
                    usePointStyle: true,
                    pointStyle: 'circle', //'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle'
                },
            },
        },
    };

    return { lineData, lineOptions }; // Return the data and options
};

export default useLineChartOptions; // Export the custom hook