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
import { CitiesService } from '../services/cities.service';
import { RoutableController } from './routable-controller';

@injectable()
export class CitiesController extends RoutableController {
    constructor(@inject(types.CitiesService) private citiesService: CitiesService) {
        super('cities');
    }

    getRouter(): Router {
        this.router.get('/', async(req: Request, res: Response, next: NextFunction) => {
            const query: string = req.query.q;
            const cities = await this.citiesService.find(query)
                .catch(err => next(err));
            res.status(HttpStatus.OK).json(cities);
        });

        return this.router;
    }
}
