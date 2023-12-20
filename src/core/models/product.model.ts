import { ProductCategory } from '../enums';
import { ProductInterface } from '../interfaces';
import { ProductImageModel } from './product-image.model';

export class ProductModel implements ProductInterface {
  _id: string;
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  quantityInStock: number;
  images: Array<ProductImageModel>;
  displayImage: ProductImageModel;
  similarProducts: Array<string>
  category: ProductCategory;
  constructor(data: ProductInterface = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    isPopular: false,
    quantityInStock: 0,
    images: [],
    similarProducts: [],
    category: ProductCategory.OTHERS
  }) {
    this._id = data?._id || '';
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.price = data?.price || 0;
    this.isPopular = data?.isPopular || false;
    this.quantityInStock = data?.quantityInStock || 0;
    this.images = data?.images || [];
    this.displayImage = new ProductImageModel();
    this.similarProducts = data?.similarProducts || [];
    this.category = data?.category || ProductCategory.OTHERS;
  }
};
