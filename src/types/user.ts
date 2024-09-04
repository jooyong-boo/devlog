export const userRoles = {
  normal: {
    id: 1,
    name: 'normal',
  },
  admin: {
    id: 2,
    name: 'admin',
  },
} as const;

export interface User {
  id: string;
  nickname: string;
  email: string;
  role: (typeof userRoles)[keyof typeof userRoles];
  profile?: string;
}
