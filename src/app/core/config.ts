import { InjectionToken } from '@angular/core';

import { IAppConfig } from '../shared/interfaces/app-config';

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

const baseUrl = '/api';

export const AppConfig: IAppConfig = {
    citiesEndpoint: `${baseUrl}/cities`,
    forecastsEndpoint: `${baseUrl}/forecasts`,
};
