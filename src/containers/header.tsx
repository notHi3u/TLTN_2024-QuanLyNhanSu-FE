'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { MdOutlineMail } from 'react-icons/md';
import { PiNotificationBold } from 'react-icons/pi';
import { Avatar, AvatarGroup } from '@nextui-org/react';
import { RiUserAddLine } from 'react-icons/ri';
import { ThemeSwitcher } from '@/components/switch/theme-switcher';
import SearchBox from '@/components/search-box/search-box';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface HeaderProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    className?: string;
}

const Header = ({ isOpen, setIsOpen, className }: HeaderProps) => {

    const header = useSelector((state: RootState) => state.header)

    const handleOpenToggle = () => {
        console.log('Toggle sidebar', isOpen);
        setIsOpen(!isOpen); 
    };

    // Update the breadcrumbs rendering section
    return (
        <div
            className="bg-primary-200 text-foreground py-3 navbar sticky top-0 z-10 shadow-lg w-full mx-auto flex justify-between items-center px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 transition-colors duration-300 ease-in-out rounded-t-lg"
        >
            {/* Page name */}
            <div className="flex justify-between font-bold text-xl">
                {header.pageTitle}
            </div>

            {/* header content */}
            <div className="flex-1 transition-colors duration-300 ease-in-out flex justify-end items-center">
                <div className="mx-4 overflow-hidden">
                    <SearchBox />
                </div>

                <div className="flex gap-4 items-center">
                    <Button
                        variant="bordered"
                        isIconOnly
                        size="lg"
                        className="bg-primary-500 border-primary-300"
                    >
                        <MdOutlineMail className="w-[60%] h-auto" />
                    </Button>
                    <Button
                        variant="bordered"
                        isIconOnly
                        size="lg"
                        className="bg-primary-500 border-primary-300"
                    >
                        <PiNotificationBold className="w-[60%] h-auto" />
                    </Button>
                </div>

                {/* avatar group nextUI can't do this --> build my library */}
                <div className="flex mx-4">
                    <AvatarGroup isBordered color='primary' max={3}>
                        <Avatar
                            size="md"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className="z-10 rounded-full bg-primary-300"
                            style={{ width: '40px', height: '40px' }}
                        />
                        <Avatar
                            size="md"
                            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                            className="z-20"
                            style={{
                                marginLeft: '-10px',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                        <Avatar
                            size="md"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            className="z-30"
                            style={{
                                marginLeft: '-10px',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                        <Avatar
                            size="md"
                            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                            className="z-40"
                            style={{
                                marginLeft: '-10px',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                    </AvatarGroup>
                </div>

                <div>
                    <Button
                        variant="bordered"
                        size="lg"
                        className="font-bold bg-primary-500 border-primary-300"
                        startContent={<RiUserAddLine />}
                        onClick={handleOpenToggle}
                    >
                        Invite
                    </Button>
                </div>
                <div className={`ml-4 ${className}`}>
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    );
};

export default Header;
