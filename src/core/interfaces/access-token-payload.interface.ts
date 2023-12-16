import { UserRole } from '../enums';

export interface AccessTokenPayloadInterface {
  userId: string;
  userRole: UserRole;
  iat: number;
  exp: number;
}
