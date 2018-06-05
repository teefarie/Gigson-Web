/**
 * Created by KolawoleBalogun on 3/27/17.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";
import {isUndefined} from "util";

@Pipe({
  name: 'ParseDate'
})

export class ParseDate implements PipeTransform {
  constructor(private _datepipe: DatePipe) {
  }

  transform(value: string, dateFormat: string): any {
    if(!isUndefined(value)) {
      let newDate = new Date(value);
      return this._datepipe.transform(newDate, dateFormat);
    }
  }

}
