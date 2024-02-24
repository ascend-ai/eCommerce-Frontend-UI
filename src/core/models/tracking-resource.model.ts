import {
  TrackingResourceInterface
} from '../interfaces';

export class TrackingResourceModel implements TrackingResourceInterface {
  trackingId: string;
  trackingUrl: string;

  constructor(data: Partial<TrackingResourceInterface> | Partial<TrackingResourceModel> = {
    trackingId: '',
    trackingUrl: ''
  }) {
    this.trackingId = data?.trackingId || '';
    this.trackingUrl = data?.trackingUrl || '';
  }
}