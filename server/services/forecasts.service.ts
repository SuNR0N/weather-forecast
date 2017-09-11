import * as HttpStatus from 'http-status-codes';
import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { config } from '../config/server.config';
import {
    ICityForecast,
    IHttpError,
} from '../interfaces';
import { logger } from '../utils/logger';

export interface IForecastsService {
    getForecastByCityId(id: number): Promise<ICityForecast>;
}

@injectable()
export class ForecastsService implements IForecastsService {
    public async getForecastByCityId(id: number): Promise<ICityForecast> {
        const cityForecast: ICityForecast = await fetch(`${config.forecastAPIUrl}?id=${id}&APPID=${config.forecastAPIKey}`)
            .then<Buffer | IHttpError, IHttpError>((response) => {
                if (response.status === HttpStatus.OK) {
                    return response.buffer();
                } else {
                    logger.debug(
                        `An internal error has occurred while fetching the forecasts from OpenWeatherMap.`,
                        `Details: [ Status: ${response.status}, Statux Text: ${response.statusText} ]`,
                    );
                    const error: IHttpError = {
                        status: response.status,
                        statusText: response.statusText,
                    };
                    return Promise.reject<IHttpError>(error);
                }
            })
            .then((buffer) => {
                return JSON.parse(buffer.toString());
            });
        return cityForecast;
    }
}
