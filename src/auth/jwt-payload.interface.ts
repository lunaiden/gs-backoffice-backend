export interface JwtPayload {
  userId: string;

  email: string;

  roleName: string;
}

export interface JwtPasswordPayload {
  userId: string;
  email: string;
}
