import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { DailyWeatherWidgetComponent } from './daily-weather-widget.component';

describe('DailyWeatherWidgetComponent', () => {
  let component: DailyWeatherWidgetComponent;
  let fixture: ComponentFixture<DailyWeatherWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyWeatherWidgetComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
