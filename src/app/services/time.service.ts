import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TimeModel} from '../models/time.model';
import {Observable} from 'rxjs';
import set = Reflect.set;

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private api = {
    baseUrl: 'http://api.geonames.org/timezoneJSON'
  };

  constructor(private http: HttpClient) {
  }

  getCurrentTime(lat: number, lon: number): Observable<TimeModel> {
    const params = new HttpParams()
      .set('lat', String(lat))
      .set('lng', String(lon))
      .set('formatted', 'true')
      .set('username', 'nhan')
      .set('style', 'full');
    return this.http.get<TimeModel>(this.api.baseUrl, {params});
  }
}
