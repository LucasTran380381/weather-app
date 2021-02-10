export interface WeatherModel {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}
