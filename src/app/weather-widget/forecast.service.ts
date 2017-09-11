import { HttpClient } from '@angular/common/http';
import {
    Inject,
    Injectable,
} from '@angular/core';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { APP_CONFIG } from '../core/config';
import { ExceptionService } from '../core/exception/exception.service';
import {
    IAppConfig,
    ICity,
    ICityForecast,
} from '../shared/interfaces';

@Injectable()
export class ForecastService {
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient,
        private exceptionService: ExceptionService,
    ) { }

    public getForecastForCity(city: ICity): Observable<ICityForecast> {
        return this.http.get<ICityForecast>(`${this.config.forecastsEndpoint}/${city.id}`)
            .catch(this.exceptionService.catchErrorResponse);
    }
}
