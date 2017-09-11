import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TypeaheadModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { CitySelectorComponent } from './city-selector/city-selector.component';
import {
  APP_CONFIG,
  AppConfig,
} from './core/config';
import { ExceptionService } from './core/exception/exception.service';
import { DailyWeatherWidgetComponent } from './daily-weather-widget/daily-weather-widget.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    CitySelectorComponent,
    WeatherWidgetComponent,
    DailyWeatherWidgetComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: AppConfig,
    },
    ExceptionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
