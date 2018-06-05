/**
 * Created by KolawoleBalogun on 3/27/17.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {isUndefined} from "util";

@Pipe({
  name: 'highlightSearchKeyword'
})

export class highlightSearchKeyword implements PipeTransform {
  constructor() {
  }

  transform(value: string, keyword: string): any {
    if(!isUndefined(value) && value.trim() != "") {
      value = value.toString();
      let pattern = new RegExp("(" + keyword + ")", "gi");
      return value.replace(pattern, "<span class='highlight'>$1</span>");
    }
  }

}
