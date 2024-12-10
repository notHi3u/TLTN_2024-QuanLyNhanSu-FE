import { useTheme } from 'next-themes';

const useMultiBarChartOptions = () => {
    const { theme } = useTheme();

    const getTextColor = () => {
        return theme === 'wata-dark' ? '#FFFFFF' : '#000000';
    };

    const multiData = {
        labels: [
            'Hazel Nutt',
            'Simon Cyrene',
            'Aida Bugg',
            'Peg Legge',
            'Barb Akew',
        ],
        datasets: [
            {
                label: 'Sick Leave',
                data: [50, 40, 30, 20, 10],
                backgroundColor: '#FF6384',
                borderColor: '#ffffff', // Viền trắng để phân cách rõ ràng
                borderWidth: 2, // Độ dày viền
                barThickness: 15,
            },
            {
                label: 'Day Off',
                data: [70, 60, 50, 40, 30],
                backgroundColor: '#36A2EB',
                borderColor: '#ffffff',
                borderWidth: 2,
                barThickness: 15,
            },
            {
                label: 'On Time',
                data: [30, 20, 10, 0, 50],
                backgroundColor: '#FFCE56',
                borderColor: '#ffffff',
                borderWidth: 2,
                barThickness: 15,
            },
        ],
    };

    const multiOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y' as const, // Xếp theo chiều ngang (horizontal)
        plugins: {
            legend: {
                position: 'bottom' as const,
                align: 'start' as const,
                labels: {
                    color: getTextColor(),
                    font: {
                        size: 14,
                        weight: 300,
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
        },
        scales: {
            x: {
                stacked: true, // Xếp chồng trên trục x
                ticks: {
                    color: getTextColor(),
                },
            },
            y: {
                stacked: true, // Xếp chồng trên trục y
                ticks: {
                    color: getTextColor(),
                },
            },
        },
    };

    return { multiData, multiOptions };
};

export default useMultiBarChartOptions;
