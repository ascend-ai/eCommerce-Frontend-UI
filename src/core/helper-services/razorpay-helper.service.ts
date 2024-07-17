import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';
import {
  ACCEPTED_CURRENCY,
  COMPANY_NAME,
  INR_SUBUNIT
} from '../constants';

@Injectable()
export class RazorpayHelperService {
  private readonly RAZORPAY_KEY = environment.razorpayId;
  private readonly API_URL = environment.apiUrl;

  constructor() { }

  public checkout(amount: number, razorpayOrderId: string): void {
    const options = {
      key: this.RAZORPAY_KEY,
      amount: amount * INR_SUBUNIT,
      currency: ACCEPTED_CURRENCY,
      name: COMPANY_NAME,
      description: 'Test Transaction',
      image: 'https://i.imgur.com/SPTWySs.jpg',
      order_id: razorpayOrderId,
      callback_url: this.API_URL + '/orders/verify-payment',
      notes: {
          address: 'Razorpay Corporate Office'
      },
      theme: {
          color: '#FEB5BC'
      }
    };

    // @ts-ignore
    const  rzp = new window.Razorpay(options);
    rzp.open();
  }

}
