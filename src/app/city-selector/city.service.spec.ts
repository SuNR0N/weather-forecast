import { HttpClientModule } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import {
    async,
    inject,
    TestBed,
} from '@angular/core/testing';

import {
    APP_CONFIG,
    AppConfig,
  } from '../core/config';
import { ExceptionService } from '../core/exception/exception.service';
import { CityService } from './city.service';

describe('CityService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
            ],
            providers: [
                CityService,
                {
                    provide: APP_CONFIG,
                    useValue: AppConfig,
                },
                ExceptionService,
            ],
        });
    });

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it('should call the right url if query param does not exist',
        async(
            inject(
                [CityService, HttpTestingController],
                (cityService: CityService, backend: HttpTestingController) => {
                    cityService.findCity().subscribe();

                    backend.expectOne({
                        method: 'GET',
                        url: '/api/cities',
                    });
                },
            ),
        ),
    );

    it('should call the url with q query param if query param exists',
        async(
            inject(
                [CityService, HttpTestingController],
                (cityService: CityService, backend: HttpTestingController) => {
                    cityService.findCity('test').subscribe();

                    backend.expectOne({
                        method: 'GET',
                        url: '/api/cities?q=test',
                    });
                },
            ),
        ),
    );
});
