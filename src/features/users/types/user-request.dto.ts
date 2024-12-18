// dtos/userRequestDto.ts
export interface UserRequestDto {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    rolesIds?: number[];
    avatar: string;
    staffId: number;
}