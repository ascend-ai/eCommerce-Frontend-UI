import { UserRole } from '../enums';
import {
  AddressInterface,
  UserInterface
} from '../interfaces';
import {
  AddressModel
} from './address.model';

export class UserModel implements UserInterface {
  email: string;
  password: string;
  phoneNumber: string;
  address: AddressInterface;
  role: UserRole;
  constructor(data: UserInterface = {
    email: '',
    password: '',
    phoneNumber: '',
    address: new AddressModel(),
    role: UserRole.CUSTOMER
  }) {
    this.email = data?.email || '';
    this.password = data?.password || '';
    this.phoneNumber = data?.phoneNumber || '';
    this.address = data?.address || new AddressModel();
    this.role = data?.role || UserRole.CUSTOMER;
  }
};
