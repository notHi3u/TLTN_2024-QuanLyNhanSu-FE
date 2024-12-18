/* eslint-disable */
// src/services/role.service.ts

import axios from 'axios';
import { RoleDto } from '../types/role.type';  // Assuming you have a RoleDto type
import { PaginatedResponse, RequestParams } from '@/helper/type';

export class RoleService {
    // Create a new role
    static async createRole(newRole: RoleDto): Promise<RoleDto> {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}roles`, 
                newRole,
                {
                    headers: {
                        'Content-Type': 'application/json', // Assuming roles are created with JSON payload
                    },
                }
            );
            return response.data; // Return the created role
        } catch (error: any) {
            console.error('Error creating role:', error);
            throw new Error(error.response?.data.message || 'Unable to create role at this time.');
        }
    }

    // Get a specific role by ID
    static async getRole(roleId: string): Promise<RoleDto> {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}roles/${roleId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data; // Return the role details
        } catch (error: any) {
            console.error('Error fetching role:', error);
            throw new Error(error.response?.data.message || 'Unable to fetch role at this time.');
        }
    }

    // Update an existing role
    static async updateRole(roleId: string, updatedRole: RoleDto): Promise<RoleDto> {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}roles/${roleId}`,
                updatedRole,
                {
                    headers: {
                        'Content-Type': 'application/json', // Assuming JSON for updates
                    },
                }
            );
            return response.data; // Return the updated role
        } catch (error: any) {
            console.error('Error updating role:', error);
            throw new Error(error.response?.data.message || 'Unable to update role at this time.');
        }
    }

    // Delete a role
    static async deleteRole(roleId: string): Promise<void> {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}roles/${roleId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error: any) {
            console.error('Error deleting role:', error);
            throw new Error(error.response?.data.message || 'Unable to delete role at this time.');
        }
    }

    // Get all roles with optional query parameters for pagination and filtering
    static async getAllRoles(params?: RequestParams): Promise<PaginatedResponse<RoleDto>> {
        try {
            // Build query string from params
            const queryParams = new URLSearchParams();

            if (params?.order) {
                queryParams.append('order', params.order);
            }
            if (params?.page) {
                queryParams.append('page', params.page.toString());
            }
            if (params?.take) {
                queryParams.append('take', params.take.toString());
            }
            if (params?.q) {
                queryParams.append('q', params.q);
            }
            const orderBy = params?.optionalParams?.orderBy || 'name';  // Default ordering by name
            queryParams.append('orderBy', orderBy);

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}roles?${queryParams.toString()}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return {
                data: response.data.data,
                meta: response.data.meta,
            };
        } catch (error: any) {
            console.error('Error fetching roles:', error);
            throw new Error(error.response?.data.message || 'Unable to fetch roles at this time.');
        }
    }

    // Get roles for a specific user
    static async getRolesForUser(userId: string): Promise<RoleDto[]> {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}roles/user/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data; // Return the list of roles for the user
        } catch (error: any) {
            console.error('Error fetching roles for user:', error);
            throw new Error(error.response?.data.message || 'Unable to fetch roles for user at this time.');
        }
    }
}
