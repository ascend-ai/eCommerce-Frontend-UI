import {
  AddressInterface
} from '.';
import { UserRole } from '../enums';

export interface UserInterface {
  email: string,
  password: string,
  address: AddressInterface,
  phoneNumber: string,
  role: UserRole
}
