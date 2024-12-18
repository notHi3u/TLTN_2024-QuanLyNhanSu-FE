'use client';

import React from 'react';

import {
    
} from '@nextui-org/react';


const Dashboard: React.FC = () => {

    return (
        <div
            className="bg-background text-foreground flex flex-col gap-4 sm:gap-6 ssm:p-6 sm:p-4 md:p-6 lg:p-8 xl:p-10 h-fit"
        >
            {/* Head content */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl flex mt-2">
                    Welcome back,
                    <div
                        className="font-bold ml-1 text-primary-600"
                    >
                        Azizi
                    </div>
                    !
                </h1>
                
            </div>
        </div>
    );
};

export default Dashboard;
