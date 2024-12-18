import { RoleDto } from "@/features/roles/types/role.type";


// types/user.dto.ts
export interface UserDto {
  id: number;
  username: string;
  email: string;
  roles?: RoleDto[];
  emailconfirmed: string;
}