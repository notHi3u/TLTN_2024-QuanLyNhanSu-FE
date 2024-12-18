/* eslint-disable */

// Routes Interface Starts ------------------------

import { orderBy } from "./enums";
import { ReactNode } from "react";

//response API inteface
export interface ApiRes<T> {
    result: boolean; // Trường kết quả
    message: string; // Thông điệp
    status: number;  // Trạng thái
    data: T;        // Dữ liệu, có thể là bất kỳ kiểu nào
}
/**
 * Interface for sidebar menu items.
 */
export interface SidebarMenuObj {
    path: string;
    icon: JSX.Element; // Change this to typeof Squares2X2Icon | typeof InboxArrowDownIcon | ...
    pageName: string;
    pageTitle: string;
    submenu?: SubmenuItem[];
    permission?:string;
    category?:string;
}

// export class LoginResponseDto {
//     accessToken!: string;
//     refreshToken!: string;
// }

// export class Token {
//     access_token!: number;
// }

// export class RefreshResponseDto {
//     accessToken!: string;
//     grantType!: string;
//     user!: UserDto;
//     expiredTime!:number;
// }

export interface TokenResponseDto {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export type AuthToken = {
    accessToken : string;
    refreshToken : string;
}

/**
 * Interface for submenu items.
 */
export interface SubmenuItem {
    path: string;
    icon: ReactNode; // Change this to typeof Squares2X2Icon | typeof InboxArrowDownIcon | ...
    pageName: string;
    pageTitle: string;
    permission?:string;
}


// Routes Interface End ------------------------

/**
 * Interface for api response
 */
export interface APIResponse {
    payload: object;
    message: string;
}

/**
 * Interface for UserProfile data.
 */
export interface UserProfile {
    name: string;
    avatar: string;
    emailId: string;
}

/**
 * Interface for lead data.
 */
export interface Lead {
    first_name: string;
    last_name: string;
    description: string;
    email: string;
    avatar: string;
    id?: number;
}

export interface Area {
    id: string;
    name: string;
}

export interface PhotoLockIn {
    taskId: string;
    photoUrl: string;
    timestamp: string;
}

export interface PhotoLockOut {
    taskId: string;
    photoUrl: string;
    timestamp: string;
}

export interface AssignedToUser {
    userId: string;
    taskId: string;
}
/**
 * Generic interface cho DTO trả về chung, bao gồm data và meta
 */
export interface PaginatedResponse<T> {
    data: T[];
    meta?: Meta;
}

/**
 * Interface cho các tham số tìm kiếm và phân trang khi gửi request.
 */
export interface RequestParams {
    order?: orderBy;
    page?: number;
    take?: number;
    q?: string;
    optionalParams?: any;
}

// types/pagination.ts
export interface Meta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}