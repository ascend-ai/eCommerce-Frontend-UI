import {
  Injectable
} from '@angular/core';
import {
  StallScheduleInterface
} from '../interfaces';
import {
  StallScheduleModel
} from '../models';

@Injectable()
export class StallScheduleHelperService {

  constructor() { }

  public transformStallSchedules(stallSchedules: Array<StallScheduleInterface>): Array<StallScheduleModel> {
    return stallSchedules.map(data => {
      const stallSchedule = new StallScheduleModel(data);
      return stallSchedule;
    })
  }

  /**
   * 
   * @param date should be in fomat YYYY-MM-DD
   */
  public getDateInMillisecondsSinceEpoch(date: string): number {
    return (new Date(`${date}T00:00:00`)).getTime();
  }

  /**
   * 
   * @param time should be in format HH:MM
   * @param date should be in fomat YYYY-MM-DD
   */
  public getTimeInMillisecondsSinceEpoch(time: string, date?: string): number {
    if (date) {
      return (new Date(`${date}T${time}:00`)).getTime();
    } else {
      const currentDateStr: string = (new Date()).toISOString().split('T')[0];
      return (new Date(`${currentDateStr}T${time}:00`)).getTime();
    }
  }

  public getDateFromMillisecondsSinceEpoch(date: number): string {
    let givenDate: number | string = new Date(date).getDate();
    givenDate = (givenDate > 9) ? givenDate : `0${givenDate}`;
    let givenMonth: number | string = new Date(date).getMonth() + 1;
    givenMonth = (givenMonth > 9) ? givenMonth : `0${givenMonth}`;
    const givenYear: number | string = new Date(date).getFullYear();
    return `${givenYear}-${givenMonth}-${givenDate}`;
  }

  public getTimeFromMillisecondsSinceEpoch(time: number): string {
    let hours: number | string = (new Date(time)).getHours();
    hours = (hours > 9) ? hours : `0${hours}`;
    let minutes: number | string = (new Date(time)).getMinutes();
    minutes = (minutes > 9) ? minutes : `0${minutes}`;

    return `${hours}:${minutes}`
  }
}
