/**
 * Created by KolawoleBalogun on 3/27/17.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {isUndefined} from "util";

@Pipe({
  name: 'lpad'
})

export class lPad implements PipeTransform {
  constructor() {
  }

  transform(value: string, width: number): any {
    if(!isUndefined(value)) {
      value = value.toString();
      return value.length >= width ? value : new Array(width - value.length + 1).join('0') + value;
    }
  }

}
