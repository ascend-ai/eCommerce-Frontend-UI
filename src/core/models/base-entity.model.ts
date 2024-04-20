import {
  BaseEntityInterface
} from '../interfaces';

export class BaseEntityModel implements BaseEntityInterface {
  _id: string;
  whenCreated: number;
  whenLastUpdated: number;

  constructor(data: Partial<BaseEntityInterface> | Partial<BaseEntityModel> = {
    _id: '',
    whenCreated: Date.now(),
    whenLastUpdated: Date.now(),
  }) {
    this._id = data?._id || '';
    this.whenCreated = data?.whenCreated || Date.now();
    this.whenLastUpdated = data?.whenLastUpdated || Date.now();
  }
}