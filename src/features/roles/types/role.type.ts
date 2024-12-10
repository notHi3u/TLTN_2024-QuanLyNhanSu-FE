import { PermissionDto } from "@/features/premission/types/permission.type";

export interface RoleDto {
      id: number;
      name: string;
      description: string;
      Permissions: PermissionDto[];
    }