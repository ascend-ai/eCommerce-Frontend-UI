import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AccessTokenPayloadInterface } from '../interfaces';
import { UserRole } from '../enums';

@Injectable()
export class AuthHelperService {
  private SEC_TO_MILLISEC = 1000;

  constructor() { }

  public isLoggedIn(): boolean {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const { userId, userRole, exp } = jwtDecode<AccessTokenPayloadInterface>(accessToken);
        if (userId && userRole && exp) {
          return (exp * this.SEC_TO_MILLISEC) > (new Date().getTime());
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error: any) {
      return false;
    }
  }

  /**
   * Use following method only if isLoggedIn() return true.
   */
  public isLoggedInUserAdminOrMod(): boolean {
    try {
      const accessToken = <string>localStorage.getItem('accessToken');
      const { userRole } = jwtDecode<AccessTokenPayloadInterface>(accessToken);
      return [UserRole.ADMIN, UserRole.MODERATOR].includes(userRole);
    } catch (error: any) {
      return false;
    }
  }

  public isLoggedOut(): boolean {
      return !this.isLoggedIn();
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
  }

  public setSession(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  /**
   * Use following method only if isLoggedIn() return true.
   */
  public getSession(): string {
    return <string>localStorage.getItem('accessToken');
  }
}
