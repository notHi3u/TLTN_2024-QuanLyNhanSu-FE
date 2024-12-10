// LoadingSpinner.jsx
import React from 'react';
import {Spinner} from "@nextui-org/spinner";

interface LoadingSpinnerProps {
    color?: string; // Màu sắc của spinner
    size?: 'small' | 'default' | 'large'; // Kích thước của spinner
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    // color = 'black',
    // size = 'large',
}) => {
    // Tạo một icon với màu sắc và kích thước tùy biến

    return (
        <div className="flex justify-center items-center h-screen">
            <Spinner size='lg' />
        </div>
    );
};

export default LoadingSpinner;
