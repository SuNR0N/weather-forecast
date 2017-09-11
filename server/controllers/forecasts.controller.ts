import {
    NextFunction,
    Request,
    Response,
    Router,
} from 'express';
import * as HttpStatus from 'http-status-codes';
import {
    inject,
    injectable,
} from 'inversify';
import { types } from '../config/types.config';
import { IHttpError } from '../interfaces/http-error';
import { ForecastsService } from '../services/forecasts.service';
import { RoutableController } from './routable-controller';

@injectable()
export class ForecastsController extends RoutableController {
    constructor(@inject(types.ForecastsService) private forecastsService: ForecastsService) {
        super('forecasts');
    }

    getRouter(): Router {
        this.router.get('/:cityId', async(req: Request, res: Response, next: NextFunction) => {
            const cityId: number = parseInt(req.params.cityId, 10);
            const cityForecast = await this.forecastsService.getForecastByCityId(cityId)
                .catch((error: IHttpError) => {
                    if (error.status === HttpStatus.UNAUTHORIZED) {
                        res.status(HttpStatus.UNAUTHORIZED).end();
                    } else if (error.status === HttpStatus.NOT_FOUND) {
                        res.status(HttpStatus.NOT_FOUND).end();
                    } else {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
                    }
                });
            if (cityForecast) {
                res.status(HttpStatus.OK).json(cityForecast);
            }
        });

        return this.router;
    }
}
