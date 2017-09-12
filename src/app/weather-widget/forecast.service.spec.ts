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
import { ForecastService } from './forecast.service';

describe('ForecastService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
            ],
            providers: [
                ForecastService,
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

    it('should call the right url',
        async(
            inject(
                [ForecastService, HttpTestingController],
                (forecastService: ForecastService, backend: HttpTestingController) => {
                    forecastService.getForecastForCity({ id: 123 } as any).subscribe();

                    backend.expectOne({
                        method: 'GET',
                        url: '/api/forecasts/123',
                    });
                },
            ),
        ),
    );
});
