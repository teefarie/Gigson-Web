/**
 * Created by KolawoleBalogun on 3/27/17.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {isUndefined} from "util";

@Pipe({
  name: 'DateDifference'
})

export class DateDifference implements PipeTransform {
  constructor() {
  }

  transform(value: string): any {
    if (!isUndefined(value)) {
      let newDate: any = new Date(value);
      let todayDate: any = new Date();
      return Math.round(Math.abs(todayDate - newDate) / 36e5);
    }
  }

}
