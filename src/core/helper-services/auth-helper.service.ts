import {
  Injectable
} from '@angular/core';
import {
  jwtDecode
} from 'jwt-decode';
import {
  AccessTokenPayloadInterface
} from '../interfaces';
import {
  UserRole
} from '../enums';

@Injectable()
export class AuthHelperService {
  private readonly SEC_TO_MILLISEC = 1000;

  constructor() { }


  public get isLoggedIn(): boolean {
    try {
      const accessToken: string = this.session;
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
   * Use following method only if isLoggedIn return true.
   */
  public get isLoggedInUserAdminOrMod(): boolean {
    try {
      const accessToken: string = this.session;
      const { userRole } = jwtDecode<AccessTokenPayloadInterface>(accessToken);
      return [UserRole.ADMIN, UserRole.MODERATOR].includes(userRole);
    } catch (error: any) {
      return false;
    }
  }

  /**
   * Use following method only if isLoggedIn return true.
   */
  public get isLoggedInUserAdmin(): boolean {
    try {
      const accessToken: string = this.session;
      const { userRole } = jwtDecode<AccessTokenPayloadInterface>(accessToken);
      return userRole === UserRole.ADMIN;
    } catch (error: any) {
      return false;
    }
  }

  /**
   * Use following method only if isLoggedIn return true.
   */
  public get loggedInUserId(): any {
    let userId: string | null = null;
    const accessToken: string = this.session;
    userId = jwtDecode<AccessTokenPayloadInterface>(accessToken).userId;
    return userId;
  }

  public get isLoggedOut(): boolean {
      return !this.isLoggedIn;
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
  }

  public set session(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  public get session(): string {
    return <string>localStorage.getItem('accessToken');
  }
}
