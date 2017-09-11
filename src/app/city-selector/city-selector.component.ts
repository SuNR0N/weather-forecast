import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { ICity } from '../shared/interfaces/city';
import { CityService } from './city.service';

@Component({
  selector: 'wf-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss'],
  providers: [CityService],
})
export class CitySelectorComponent implements OnInit {
  @Input()
  public selected: ICity;

  @Output()
  public onSelect: EventEmitter<ICity> = new EventEmitter();

  public asyncSelected: string;
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSource: Observable<ICity[]>;

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.dataSource = Observable
      .create((observer: any) => {
        observer.next(this.asyncSelected);
      })
      .mergeMap((token: string) => this.cityService.findCity(token));
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    if (e) {
      this.onSelect.emit(e.item);
    }
  }
}
