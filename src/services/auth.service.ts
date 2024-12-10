// src/services/auth.service.ts

import axios from 'axios';
import { LoginType } from "@/@types";
import { ApiRes, TokenResponseDto } from '@/helper/type';
import { showToast } from '@/components/toast/Toast';
import Cookies from "js-cookie";


export class AuthService {

    static async login(loginType: LoginType): Promise<ApiRes<TokenResponseDto>> {
        return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`, loginType, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                return response.data; // Trả về dữ liệu nếu thành công
            })
            .catch(error => {
                // Xử lý lỗi
                if (error.response) {
                    // Kiểm tra nếu có response từ server
                    const errorMessage = error.response.data.message || 'Login failed';
                    if (errorMessage == 'error.userNotFound') {
                        showToast.error('Incorrect credentials, please check your email,phone,password!!!');
                    }
                }
            });
    }

    static async refresh(): Promise<ApiRes<TokenResponseDto>> {
        // Get the refresh token from cookies
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }
    
        // Get the access token from cookies
        const accessToken = Cookies.get('accessToken');
    
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/refresh`,
                { refreshToken },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken || ''}`, // Fallback to an empty string if accessToken is not available
                    },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error('Refresh token error:', error);
            throw error;
        }
    }

    static async logout(): Promise<void> {
        try {
            sessionStorage.removeItem('sessionData');
        } catch (error) {
            console.error('Error logging out:', error);
            throw new Error('Unable to log out at this time.');
        }
    }

}