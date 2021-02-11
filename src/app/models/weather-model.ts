export interface WeatherModel {
  coord: {
    lon: number,
    lat: number
  };
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
