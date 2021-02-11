import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {WeatherService} from './services/weather.service';
import {WeatherModel} from './models/weather-model';
import {TimeService} from './services/time.service';
import {TimeModel} from './models/time.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  searchForm = this.fb.group({
    cityName: ''
  });
  weatherModel: WeatherModel | undefined;
  timeModel: TimeModel | undefined;

  constructor(private fb: FormBuilder, private weatherService: WeatherService, private timeService: TimeService) {
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(form => {
      if (form.cityName.trim().length < 3) {
        return;
      }
      this.weatherService.getWeatherInformation(form.cityName.trim()).subscribe(
        data => {
          this.weatherModel = data;
          this.getCurrentTime();
        },
        error => alert(error.error.message)
      );
    });

  }

  getCurrentTime(): void {
    if (!this.weatherModel) {
      return;
    }
    this.timeService.getCurrentTime(this.weatherModel.coord.lat, this.weatherModel.coord.lon).subscribe(
      response => {
        this.timeModel = response;
      }, error => console.log(error)
    );
  }
}
