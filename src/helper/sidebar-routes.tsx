import { SidebarMenuObj } from './type';
import { MdDashboard } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { FcDocument } from "react-icons/fc";
import { FcLeave } from "react-icons/fc";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { HiDocumentReport } from "react-icons/hi";
// Import other icons similarly
const iconClasses = `h-6 w-6`;

export const mainRoutes: SidebarMenuObj[] = [
    {
        path: '/dashboard',
        icon: (
            <MdDashboard className={iconClasses} />
        ),
        pageName: 'Dashboard',
        pageTitle: 'Dashboard',
        category: 'main',
    },
    {
        path: '/reports',
        icon: (
            <HiDocumentReport className={iconClasses} style={{ color: 'rgb(255 183 0 / 100%)' }}/>
        ),
        pageName: 'Reports',
        pageTitle: 'Report',
        permission: 'report:read',
        category: 'main',
    },
    {
        path: '/calendars',
        icon: (
            <FaCalendarAlt className={iconClasses}/>
        ),
        pageName: 'Calendars',
        pageTitle: 'Calendars',
        permission: 'calendar:read',
        category: 'main',

    },
    {
        path: '/settings',
        icon: (
            <IoSettings  className={iconClasses}/>
        ),
        pageName: 'Settings',
        pageTitle: 'Settings',
        permission: 'setting:read',
        category: 'main',

    },
    {
        path: '/help',
        icon: (
            <TbHelpSquareRoundedFilled  className={iconClasses}/>
        ),
        pageName: 'Help & Center',
        pageTitle: 'Help & Center',
        category: 'main',
    },
];

export const teamManagementRoutes: SidebarMenuObj[] = [
    {
        path: '/performances',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses} style={{ color: 'rgb(255 183 0 / 100%)' }}>
                <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clipRule="evenodd" />
            </svg>
        ),
        pageName: 'Performances',
        pageTitle: 'Performances',
        category: 'management',
    },
    {
        path: '/payrolls',
        icon: (
            <FaMoneyCheckDollar  className={iconClasses} />
        ),
        pageName: 'Payrolls',
        pageTitle: 'Payrolls',
        permission: 'payroll:read',
        category: 'management',
    },
    {
        path: '/invoices',
        icon: (
            <FaFileInvoiceDollar  className={iconClasses} />
        ),
        pageName: 'Invoices',
        pageTitle: 'Invoices',
        permission: 'invoice:read',
        category: 'management',

    },
    {
        path: '/staffs',
        icon: (
            <IoIosPeople  className={iconClasses}/>
        ),
        pageName: 'Staffs',
        pageTitle: 'Staffs',
        permission: 'staffs:read',
        category: 'management',

    },
    {
        path: '/hiring',
        icon: (
            <IoMdPersonAdd className={iconClasses} />
        ),
        pageName: 'Hiring',
        pageTitle: 'Hiring',
        category: 'management',
    },
];

export const listRoutes: SidebarMenuObj[] = [
    {
        path: '/salary',
        icon: (
            <FcSalesPerformance className={iconClasses} />
        ),
        pageName: 'Salary Information',
        pageTitle: 'Salary Information',
        category: 'list',
    },
    {
        path: '/compensation',
        icon: (
            <FcLeave  className={iconClasses}/>
        ),
        pageName: 'Compensation Breakdown',
        pageTitle: 'Compensation Breakdown',
        category: 'list',
    },
    {
        path: '/project',
        icon: (
            <FcDocument  className={iconClasses} />
        ),
        pageName: 'Project-specific Data',
        pageTitle: 'Project-specific Data',
        category: 'list',
    }
];

const routes = [...mainRoutes,...teamManagementRoutes,...listRoutes]

export default routes;