import { Component } from '@angular/core';

import { ICity } from './shared/interfaces/city';

@Component({
  selector: 'wf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public selectedCity: ICity;
  public title = 'Weather Forecast';

  public onCitySelect(city: ICity) {
    this.selectedCity = city;
  }
}
