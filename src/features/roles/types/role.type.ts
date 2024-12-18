import { Permission } from "@/features/permission/types/permission.type";

export interface RoleDto {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}