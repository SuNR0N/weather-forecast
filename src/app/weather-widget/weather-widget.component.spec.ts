import { HttpClientModule } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {
  APP_CONFIG,
  AppConfig,
} from '../core/config';
import { ExceptionService } from '../core/exception/exception.service';
import { DailyWeatherWidgetComponent } from '../daily-weather-widget/daily-weather-widget.component';
import { WeatherWidgetComponent } from './weather-widget.component';

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [
        WeatherWidgetComponent,
        DailyWeatherWidgetComponent,
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: AppConfig,
        },
        ExceptionService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
