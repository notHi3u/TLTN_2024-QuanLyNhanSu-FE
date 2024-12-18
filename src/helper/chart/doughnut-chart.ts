import { useTheme } from 'next-themes';

const useDoughnutChartOptions = () => {
    const { theme } = useTheme();

    const getTextColor = () => {
        return theme === 'wata-dark' ? '#FFFFFF' : '#000000';
    };

    const doughnutOptions = {
        responsive: true,
        circumference: 180, // Half the circle (180 degrees)
        rotation: 270, // Start from the bottom (6 o'clock)
        cutout: '80%',
        plugins: {
            legend: {
                position: 'right' as const,
                align: 'center' as const,
                labels: {
                    color: getTextColor(),
                    font: {
                        size: 14, // Kích thước font chữ
                        weight: 300, // Độ đậm của chữ
                    },
                    padding: 20, // Khoảng cách giữa các label
                    usePointStyle: true,
                    pointStyle: 'circle', //'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle'
                },
            },
        },
    };

    const doughnutData = {
        labels: ['Active Jobs', 'In reviews Jobs', 'Finish Jobs'],
        datasets: [
            {
                label: 'Job Overview',
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverOffset: 4,
                width: 10,
            },
        ],
    };

    return { doughnutOptions, doughnutData };
};

export default useDoughnutChartOptions;
