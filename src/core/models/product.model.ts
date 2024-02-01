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
  totalPurchases: number;
  whenCreated: number;
  whenLastUpdated: number;

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
    totalPurchases: 0,
    whenCreated: Date.now(),
    whenLastUpdated: Date.now()
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
    this.totalPurchases = data?.totalPurchases || 0;
    this.whenCreated = data?.whenCreated || Date.now();
    this.whenLastUpdated = data?.whenLastUpdated || Date.now();
  }
};
