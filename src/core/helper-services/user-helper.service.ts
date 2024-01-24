import {
  Injectable
} from '@angular/core';
import {
  UserInterface
} from '../interfaces';
import {
  UserModel
} from '../models';

@Injectable()
export class UserHelperService {

  constructor() { }

  public transformUsers(users: Array<UserInterface>): Array<UserModel> {
    return users.map(data => {
      const user = new UserModel(data);
      return user;
    })
  }
}
