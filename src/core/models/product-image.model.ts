import { ProductImageInterface } from '../interfaces';

export class ProductImageModel implements ProductImageInterface {
  _id: string;
  url: string;
  constructor(data: ProductImageInterface = {
    _id: '',
    url: ''
  }) {
    this._id = data?._id || '';
    this.url = data?.url || '';
  }
};
