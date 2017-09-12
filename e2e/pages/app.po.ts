import {
  browser,
  by,
  element,
  ElementFinder,
} from 'protractor';

import {
  CitySelectorComponent,
  WeatherWidgetComponent,
} from '../components';

export class WeatherForecastPage {
  public header: ElementFinder;
  public citySelector: CitySelectorComponent;
  public weatherWidget: WeatherWidgetComponent;

  constructor() {
    this.header = element(by.css('h1'));
    this.citySelector = new CitySelectorComponent();
    this.weatherWidget = new WeatherWidgetComponent();
  }

  navigateTo() {
    return browser.get('/');
  }
}
