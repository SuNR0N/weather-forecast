import {
    HttpClient,
    HttpParams,
} from '@angular/common/http';
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
} from '../shared/interfaces';

@Injectable()
export class CityService {
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: HttpClient,
        private exceptionService: ExceptionService,
    ) { }

    public findCity(query?: string): Observable<ICity[]> {
        let params = new HttpParams();
        if (query) {
            params = params.append('q', query);
        }
        return this.http.get<ICity[]>(this.config.citiesEndpoint, { params: params })
            .catch(this.exceptionService.catchErrorResponse);
    }
}
