import { Permission } from "@/features/permission/types/permission.type";

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}