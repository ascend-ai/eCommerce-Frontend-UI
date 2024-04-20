import {
  AddressInterface
} from './';
import {
  UserRole
} from '../enums';

export interface UserInterface {
  _id: string;
  email: string;
  password: string;
  address: AddressInterface;
  phoneNumber: string;
  role: UserRole;
  whenCreated: number;
  whenLastUpdated: number;
}
