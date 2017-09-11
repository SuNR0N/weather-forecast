import { HttpClientModule } from '@angular/common/http';
import {
  async,
  TestBed,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        TypeaheadModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        CitySelectorComponent,
        DailyWeatherWidgetComponent,
        WeatherWidgetComponent,
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: AppConfig,
        },
        ExceptionService,
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have the title of 'Weather Forecast'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Weather Forecast');
  }));

  it('should render the wf-city-selector component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('wf-city-selector')).toBeTruthy();
  }));

  it('should render the wf-weather-widget component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('wf-weather-widget')).toBeTruthy();
  }));

  it('should render the title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Weather Forecast');
  }));
});
