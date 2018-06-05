import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/finally';


@Injectable()
export class GigsService {
  constructor(private _http: Http) {
  }

  fetchAll(onComplete?) {
    let url = environment.api_base_url + "fetch-all";
    return this._http.get(url).map(res => res.json()).finally(() => {
      if (onComplete) {
        onComplete();
      }
    });
  }


  search(keyword, onComplete?) {
    let url = environment.api_base_url + "search?keyword=" + keyword;
    return this._http.get(url).map(res => res.json()).finally(() => {
      if (onComplete) {
        onComplete();
      }
    });
  }
}
