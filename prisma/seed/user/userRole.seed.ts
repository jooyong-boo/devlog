import { UsersRoles } from '@prisma/client';
import { userRoles } from '../../../src/types/user';

const userRoleSeed: Pick<UsersRoles, 'name' | 'id'>[] = [
  {
    id: userRoles.normal.id,
    name: userRoles.normal.name,
  },
  {
    id: userRoles.admin.id,
    name: userRoles.admin.name,
  },
];

export default userRoleSeed;
