import { Button } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';

const SearchBox = () => {

    const [isActive, setIsactive] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target as Node)) {
                setIsactive(false);
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref]);

    return (
        <form className="sm:hidden 2lg-xl:block max-w-lg transition-colors duration-300 ease-in-out overflow-hidden">
            <div className="flex">
                <Button id="dropdown-button" data-dropdown-toggle="dropdown"
                    className="bg-primary-500 h-12 flex-shrink-0 z-10 inline-flex items-center py-3 px-6 text-sm font-medium text-center border-2 rounded-l-xl rounded-r-none"
                    type="button"
                    onClick={() => setIsactive(!isActive)}
                >
                    All categories
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </Button>
                <div id="dropdown" className={`z-10 ${isActive ? "" : "hidden"} absolute mt-11 rounded-lg shadow w-44 border-2 overflow-hidden`} ref={ref}>
                    <ul aria-labelledby="dropdown-button" >
                        <li>
                            <Button type="button" className="bg-primary-500 w-full rounded-none px-4 py-2 flex-start" style={{ justifyContent: "flex-start" }}>Job</Button>
                        </li>
                        <li>
                            <Button type="button" className="bg-primary-500 w-full rounded-none px-4 py-2 flex-start" style={{ justifyContent: "flex-start" }}>Level</Button>

                            <Button type="button" className="bg-primary-500 w-full rounded-none px-4 py-2 flex-start" style={{ justifyContent: "flex-start" }}>Design</Button>
                        </li>
                        <li>
                            <Button type="button" className="bg-primary-500 w-full rounded-none px-4 py-2 flex-start" style={{ justifyContent: "flex-start" }}>Logos</Button>
                        </li>
                    </ul>
                </div>
                <div className="relative w-full flex">
                    <input type="search" id="search-dropdown" className="bg-primary-500 h-12 outline-none block p-3 w-full z-20 text-sm border-2 border-x-0" placeholder="Search Job,Level..." required />
                    <Button type="submit" size='sm' className="bg-transparent p-2.5 text-sm font-medium h-full border-2 rounded-l-none rounded-r-xl">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default SearchBox;