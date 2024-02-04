import { SigninInterface } from '../interfaces';

export class SigninModel implements SigninInterface {
  email: string;
  password: string;
  constructor(data: Partial<SigninInterface> | Partial<SigninModel> = {
    email: '',
    password: ''
  }) {
    this.email = data?.email || '';
    this.password = data?.password || '';
  }
};
