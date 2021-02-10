import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {WeatherService} from './weather.service';
import {WeatherModel} from './models/weather-model';

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

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(form => {
      if (form.cityName.length < 3) {
        return;
      }
      this.weatherService.getWeatherInformation(form.cityName).subscribe(
        data => {
          this.weatherModel = data;
          console.log(this.weatherModel.name);
        },
        error => alert(error.error.message)
      );
    });
  }
}
