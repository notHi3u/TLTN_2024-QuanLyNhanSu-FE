
// /* eslint-disable */
// // src/services/user.service.ts

// import axios from 'axios';
// import { UserDto } from '../types/user.type';
// import { PaginatedResponse, RequestParams } from '@/helper/type';

// export class UserService {
//     static async createUser(updatedUser: FormData): Promise<UserDto> {
//         try {
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}users`, updatedUser, { // Update to send formData
//                 headers: {
//                     'Content-Type': 'multipart/form-data', // Update to handle FormData
//                 },
//             });

//             return response.data; // Trả về người dùng đã tạo
//         } catch (error: any) {
//             console.error('Error creating user:', error);
//             throw new Error(error.response?.data.message || 'Unable to create user at this time.');
//         }
//     }

//     static async getUser(userId: number): Promise<UserDto> {
//         try {
//             const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}users/${userId}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log(response.data)

//             return response.data; // Trả về chi tiết người dùng
//         } catch (error: any) {
//             console.error('Error fetching user:', error);
//             throw new Error(error.response?.data.message || 'Unable to fetch user at this time.');
//         }
//     }

//     static async updateUser(userId: string, updatedUser: FormData): Promise<UserDto> {
//         try {
//             console.log(updatedUser)
//             const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}users/${userId}`, updatedUser, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data', // Update to handle FormData
//                 },
//             });

//             return response.data; // Return the updated user
//         } catch (error: any) {
//             console.error('Error updating user:', error);
//             throw new Error(error.response?.data.message || 'Unable to update user at this time.');
//         }
//     }

//     static async deleteUser(userId: string): Promise<void> {
//         try {
//             await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}users/${userId}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//         } catch (error: any) {
//             console.error('Error deleting user:', error);
//             throw new Error(error.response?.data.message || 'Unable to delete user at this time.');
//         }
//     }

//     // Lấy tất cả người dùng
//     static async getAllUsers(params?: RequestParams): Promise<PaginatedResponse<UserDto>> {
//         try {
//             // Build query string from params
//             const queryParams = new URLSearchParams();

//             if (params?.order) {
//                 queryParams.append('order', params.order);
//             }
//             if (params?.page) {
//                 queryParams.append('page', params.page.toString());
//             }
//             if (params?.take) {
//                 queryParams.append('take', params.take.toString());
//             }
//             if (params?.q) {
//                 queryParams.append('q', params.q);
//             }
//             const orderBy = params?.optionalParams?.orderBy || 'email';
//             queryParams.append('orderBy', orderBy);
//             const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}users?${queryParams.toString()}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             return {
//                 data: response.data.data,
//                 meta: response.data.meta,
//             };
//         } catch (error: any) {
//             console.error('Error fetching users:', error);
//             throw new Error(error.response?.data.message || 'Unable to fetch users at this time.');
//         }
//     }

//     static async getUserLastSeen(userId: string): Promise<any> {
//         try {
//             const response = await axios.get(
//                 `${process.env.NEXT_PUBLIC_API_BASE_URL}users/${userId}/last-seen`,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             return response.data;
//         } catch (error: any) {
//             console.error('Error fetching user last seen:', error);
//             throw new Error(error.response?.data.message || 'Unable to fetch user last seen status at this time.');
//         }
//     }
// }
