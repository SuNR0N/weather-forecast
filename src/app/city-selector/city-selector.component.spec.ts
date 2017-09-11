import { HttpClientModule } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

import {
  APP_CONFIG,
  AppConfig,
} from '../core/config';
import { ExceptionService } from '../core/exception/exception.service';
import { CitySelectorComponent } from './city-selector.component';


describe('CitySelectorComponent', () => {
  let component: CitySelectorComponent;
  let fixture: ComponentFixture<CitySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        TypeaheadModule.forRoot(),
      ],
      declarations: [ CitySelectorComponent ],
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
    fixture = TestBed.createComponent(CitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
