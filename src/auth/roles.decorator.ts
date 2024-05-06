import { Role } from './roles-enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
