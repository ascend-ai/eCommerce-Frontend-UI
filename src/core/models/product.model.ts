import {
  ProductCategory
} from '../enums';
import {
  ProductInterface
} from '../interfaces';
import {
  CustomizationTextRangeModel,
  ProductImageModel
} from './';

export class ProductModel implements ProductInterface {
  // API properties
  _id: string;
  name: string;
  description: string;
  sellingPrice: number;
  maxRetailPrice: number;
  isPinned: boolean;
  quantityInStock: number;
  images: Array<ProductImageModel>;
  similarProducts: Array<any>;
  category: ProductCategory;
  totalPurchases: number;
  customizationTextRange: CustomizationTextRangeModel;
  whenCreated: number;
  whenLastUpdated: number;

  // UI properties
  displayImage: ProductImageModel;
  constructor(data: Partial<ProductInterface> | Partial<ProductModel> = {
    _id: '',
    name: '',
    description: '',
    sellingPrice: 0,
    maxRetailPrice: 0,
    isPinned: false,
    quantityInStock: 0,
    images: [],
    similarProducts: [],
    category: ProductCategory.OTHERS,
    displayImage: new ProductImageModel(),
    totalPurchases: 0,
    customizationTextRange: new CustomizationTextRangeModel(),
    whenCreated: Date.now(),
    whenLastUpdated: Date.now()
  }) {
    this._id = data?._id || '';
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.sellingPrice = data?.sellingPrice || 0;
    this.maxRetailPrice = data?.maxRetailPrice || 0;
    this.isPinned = data?.isPinned || false;
    this.quantityInStock = data?.quantityInStock || 0;
    this.images = data?.images || [];
    this.similarProducts = data?.similarProducts || [];
    this.category = data?.category || ProductCategory.OTHERS;
    this.displayImage = data?.displayImage ? new ProductImageModel(data.displayImage): new ProductImageModel();
    this.totalPurchases = data?.totalPurchases || 0;
    this.customizationTextRange = data?.customizationTextRange ? new CustomizationTextRangeModel(data.customizationTextRange) : new CustomizationTextRangeModel();
    this.whenCreated = data?.whenCreated || Date.now();
    this.whenLastUpdated = data?.whenLastUpdated || Date.now();
  }
};
