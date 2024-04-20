import {
  StallScheduleInterface
} from '../interfaces';

export class StallScheduleModel implements StallScheduleInterface {
  _id: string;
  venue: string;
  date: number
  openingTime: number;
  closingTime: number;
  whenCreated: number;
  whenLastUpdated: number;

  constructor(data: Partial<StallScheduleInterface> | Partial<StallScheduleModel> = {
    _id: '',
    venue: '',
    date: Date.now(),
    openingTime: Date.now(),
    closingTime: Date.now(),
    whenCreated: Date.now(),
    whenLastUpdated: Date.now(),
  }) {
    this._id = data?._id || '';
    this.venue = data.venue || '';
    this.date = data.date || Date.now();
    this.openingTime = data.openingTime || Date.now();
    this.closingTime = data.closingTime || Date.now();
    this.whenCreated = data?.whenCreated || Date.now();
    this.whenLastUpdated = data?.whenLastUpdated || Date.now();
  }
}