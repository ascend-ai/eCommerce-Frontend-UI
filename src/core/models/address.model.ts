import {
  AddressInterface
} from '../interfaces';

export class AddressModel implements AddressInterface {
  streetAddressLine1: string;
  streetAddressLine2: string;
  streetAddressLine3: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  constructor(data: AddressInterface | AddressModel = {
    streetAddressLine1: '',
    streetAddressLine2: '',
    streetAddressLine3: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  }) {
    this.streetAddressLine1 = data?.streetAddressLine1 || '';
    this.streetAddressLine2 = data?.streetAddressLine2 || '';
    this.streetAddressLine3 = data?.streetAddressLine3 || '';
    this.city = data?.city || '';
    this.state = data?.state || '';
    this.country = data?.country || '';
    this.postalCode = data?.postalCode || '';
  }
};
