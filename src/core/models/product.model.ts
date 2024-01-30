import { ProductCategory } from '../enums';
import { ProductInterface } from '../interfaces';
import { ProductImageModel } from './product-image.model';

export class ProductModel implements ProductInterface {
  // API properties
  _id: string;
  name: string;
  description: string;
  price: number;
  isPinned: boolean;
  quantityInStock: number;
  images: Array<ProductImageModel>;
  similarProducts: Array<any>;
  category: ProductCategory;

  // UI properties
  displayImage: ProductImageModel;
  constructor(data: ProductInterface | ProductModel = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    isPinned: false,
    quantityInStock: 0,
    images: [],
    similarProducts: [],
    category: ProductCategory.OTHERS,
    displayImage: new ProductImageModel(),
  }) {
    this._id = data?._id || '';
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.price = data?.price || 0;
    this.isPinned = data?.isPinned || false;
    this.quantityInStock = data?.quantityInStock || 0;
    this.images = data?.images || [];
    this.similarProducts = data?.similarProducts || [];
    this.category = data?.category || ProductCategory.OTHERS;
    this.displayImage = data?.displayImage || new ProductImageModel();
  }
};
