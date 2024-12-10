import { useTheme } from 'next-themes';

const useBarChartOptions = () => { // Create a custom hook
    
    const { theme } = useTheme();

    const getTextColor = () => {
        return theme === 'wata-dark' ? '#FFFFFF' : '#000000';
    };

    const data = {
        labels: [''],
        datasets: [
            {
                label: 'Sick Leave',
                data: [50], // Giá trị của dataset 1
                backgroundColor: '#FF6384',
                borderRadius: 10, // Bo tròn cả hai đầu của thanh
                borderWidth: 2,
                borderColor: '#FF6384',
                barThickness: 10, // Điều chỉnh độ rộng của thanh
            },
            {
                label: 'Day Off',
                data: [70], // Giá trị của dataset 2
                backgroundColor: '#36A2EB',
                borderRadius: 10, // Bo tròn cả hai đầu của thanh
                borderWidth: 2,
                borderColor: '#36A2EB',
                barThickness: 10, // Điều chỉnh độ rộng của thanh
            },
            {
                label: 'On Time',
                data: [30], // Giá trị của dataset 3
                backgroundColor: '#FFCE56',
                borderRadius: 10, // Bo tròn cả hai đầu của thanh
                borderWidth: 2,
                borderColor: '#FFCE56',
                barThickness: 10, // Điều chỉnh độ rộng của thanh
            },
        ],
    };

    // Cấu hình cho biểu đồ
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y' as const, // Xếp theo chiều ngang (horizontal)
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
        scales: {
            x: {
                stacked: true, // Xếp chồng các thanh dữ liệu trên trục X
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                border: {
                    display: false, // Ẩn trục X
                },
            },
            y: {
                stacked: true, // Xếp chồng các thanh dữ liệu trên trục Y
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                border: {
                    display: false, // Ẩn trục Y
                },
            },
        },
    };

    return { data, options }; // Return the data and options
};

export default useBarChartOptions; // Export the custom hook