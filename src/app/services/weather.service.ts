import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeatherModel} from '../models/weather-model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherApi = {
    key: '6014cb02622aaadbb5298b7fe84e8314',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
  };

  constructor(private http: HttpClient) {
  }

  getWeatherInformation(cityName: string): Observable<WeatherModel> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('appid', this.weatherApi.key)
      .set('units', 'metric')
      .set('lang', 'vi');
    return this.http.get<WeatherModel>(this.weatherApi.baseUrl, {params});
  }
}
