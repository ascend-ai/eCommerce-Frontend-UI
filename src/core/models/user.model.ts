import {
  UserRole
} from '../enums';
import {
  AddressInterface,
  UserInterface
} from '../interfaces';
import {
  AddressModel
} from './';

export class UserModel implements UserInterface {
  _id: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: AddressInterface;
  role: UserRole;
  whenCreated: number;
  whenLastUpdated: number;
  constructor(data: Partial<UserInterface> | Partial<UserModel> = {
    _id: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: new AddressModel(),
    role: UserRole.CUSTOMER,
    whenCreated: Date.now(),
    whenLastUpdated: Date.now()
  }) {
    this._id = data?._id || '';
    this.email = data?.email || '';
    this.password = data?.password || '';
    this.phoneNumber = data?.phoneNumber || '';
    this.address =  data?.address ? new AddressModel(data.address) : new AddressModel();
    this.role = data?.role || UserRole.CUSTOMER;
    this.whenCreated = data?.whenCreated || Date.now();
    this.whenLastUpdated = data?.whenLastUpdated || Date.now();
  }
};
