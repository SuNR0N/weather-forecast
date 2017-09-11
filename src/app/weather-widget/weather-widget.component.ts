import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  ICity,
  ICityForecast,
} from '../shared/interfaces';
import { IForecast } from '../shared/interfaces/forecast';
import { DailyForecast } from './daily-forecast.model';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'wf-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  providers: [ForecastService],
})
export class WeatherWidgetComponent implements OnChanges {
  @Input()
  public city: ICity;

  public cityForecast: ICityForecast;
  public dailyForecast: DailyForecast;
  public dailyForecasts: DailyForecast[];

  constructor(private forecastService: ForecastService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.city.currentValue) {
      this.forecastService.getForecastForCity(changes.city.currentValue)
        .subscribe((result) => {
          this.cityForecast = result;
          this.dailyForecasts = this.getDailyForecasts(this.cityForecast);
          this.dailyForecast = this.dailyForecasts[0];
        });
    }
  }

  public selectForecast(index: number) {
    this.dailyForecast = this.dailyForecasts[index];
  }

  private getDailyForecasts(cityForecast: ICityForecast): DailyForecast[] {
    const map: Map<String, IForecast[]> = new Map();
    cityForecast.list.forEach((forecast) => {
      const day = forecast.dt_txt.split(' ')[0];
      const value = map.get(day);
      if (!value) {
        map.set(day, [forecast]);
      } else {
        value.push(forecast);
      }
    });
    const dailyForecasts: DailyForecast[] = [];
    for (const forecasts of Array.from(map.values())) {
      dailyForecasts.push(new DailyForecast(forecasts));
    }
    console.log(dailyForecasts);
    return dailyForecasts;
  }
}
