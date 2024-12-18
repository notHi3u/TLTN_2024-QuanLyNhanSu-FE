import React, { ReactNode } from "react";
import Subtitle from "../typography/subtitle";


interface TitleCardProps {
    title: string;
    tags?: ReactNode; // Thay đổi loại dữ liệu cho tags nếu cần
    children: ReactNode;
    topMargin?: string;
    TopSideButtons?: ReactNode;
    showFilter?: boolean;
    FilterButton?: ReactNode;
    optionalText?: string;
    // showSearchBar?: boolean;
    // onSearch?: (searchTerm: string) => void;
}

function TitleCard({ title, children, topMargin, TopSideButtons, optionalText, tags, FilterButton }: TitleCardProps) {
    return (
        <div className={"card w-full p-4 ssm:p-6 sm:p-4 md:p-6 lg:p-8 xl:p-10 bg-white rounded-md shadow-xl " + (topMargin)}>
            {/* Title, Search bar, FilterButton, and TopSideButtons */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-4">
                <div className="flex items-center w-full md:w-auto">
                    <Subtitle styleClass="inline-block text-lg sm:text-xl md:text-2xl">{title}</Subtitle>
                    <span className="ml-2 text-sm sm:text-base">{tags}</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        {/* {showSearchBar && (
                            <Input.Search
                                placeholder="Search...."
                                onSearch={(value) => onSearch && onSearch(value)}
                                className="w-full sm:w-80 md:w-96 shadow-sm"
                                size="middle"
                                allowClear
                                enterButton={false}
                                loading={false}
                            />
                        )} */}
                        {FilterButton && <div className="flex-shrink-0">{FilterButton}</div>}
                    </div>
                    {TopSideButtons && <div className="flex-shrink-0">{TopSideButtons}</div>}
                </div>
            </div>

            {/* Optional text display */}
            {optionalText && <p className="text-gray-500 text-xs sm:text-sm mt-1">{optionalText}</p>}

            <div className="divider mt-2 md:mt-3"></div>

            {/* Card Body */}
            <div className="mt-3 md:mt-4">
                {children}
            </div>
        </div>
    );
}

export default TitleCard;
