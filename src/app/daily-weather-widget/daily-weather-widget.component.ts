import {
  Component,
  Input,
} from '@angular/core';
import { DailyForecast } from '../shared/daily-forecast';

@Component({
  selector: 'wf-daily-weather-widget',
  templateUrl: './daily-weather-widget.component.html',
  styleUrls: ['./daily-weather-widget.component.scss'],
})
export class DailyWeatherWidgetComponent {
  @Input()
  public forecast: DailyForecast;
}
