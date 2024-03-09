import {
  CustomizationTextRangeInterface
} from '../interfaces';

export class CustomizationTextRangeModel implements CustomizationTextRangeInterface {
  min: number;
  max: number;

  constructor(data: Partial<CustomizationTextRangeInterface> | Partial<CustomizationTextRangeModel> = {
    min: 0,
    max: 0,
  }) {
    this.min = data?.min || 0;
    this.max = data?.max || 0;
  }
}