import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { DailyForecast } from '../shared/daily-forecast';
import {
  ICity,
  ICityForecast,
  IForecast,
} from '../shared/interfaces';
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

  public dailyForecast: DailyForecast;
  public dailyForecasts: DailyForecast[];

  constructor(private forecastService: ForecastService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.city.currentValue) {
      this.forecastService.getForecastForCity(changes.city.currentValue)
        .subscribe((result) => {
          this.dailyForecasts = this.getDailyForecasts(result);
          this.dailyForecast = this.dailyForecasts[0];
        });
    }
  }

  public selectForecast(forecast: DailyForecast) {
    this.dailyForecast = forecast;
  }

  public get icon(): string {
    if (!this.dailyForecast) {
      return '';
    } else {
      return this.dailyForecast.isToday() ? this.dailyForecast.icon : this.dailyForecast.mainIcon;
    }
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
    for (const forecasts of map.values()) {
      dailyForecasts.push(new DailyForecast(forecasts));
    }
    return dailyForecasts.slice(0, 5);
  }
}
