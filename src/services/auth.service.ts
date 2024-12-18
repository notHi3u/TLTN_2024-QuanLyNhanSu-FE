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
    
        try {
          // Make the API request to refresh the token
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/refresh`, // Ensure the endpoint matches Swagger
            { refreshToken }, // Payload with refreshToken
            {
              headers: {
                'Content-Type': 'application/json', // Set JSON content type
              },
              //withCredentials: true, // Send cookies with request
            }
          );
    
        //   // Optionally save the new tokens if they are returned
        //   if (response.data && response.data.accessToken && response.data.refreshToken) {
        //     const { accessToken, refreshToken: newRefreshToken } = response.data;
        //     Cookies.set('accessToken', accessToken, { expires: 55 / 1440, sameSite: 'strict' }); // Example: 55 minutes
        //     Cookies.set('refreshToken', newRefreshToken, { expires: 7, sameSite: 'strict' });    // Example: 7 days
        //   }
    
          return response.data;
        } catch (error) {
          console.error('Refresh token error:', error);
          throw new Error("Failed to refresh token");
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