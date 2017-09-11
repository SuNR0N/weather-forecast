import { Container } from 'inversify';
import 'reflect-metadata';
import {
    CitiesController,
    ForecastsController,
    IRoutableController,
} from '../controllers';
import {
    CitiesService,
    ForecastsService,
    ICitiesService,
    IForecastsService,
} from '../services';
import { types } from './types.config';

export const container = new Container();

container.bind<IRoutableController>(types.Controller).to(CitiesController);
container.bind<IRoutableController>(types.Controller).to(ForecastsController);
container.bind<ICitiesService>(types.CitiesService).to(CitiesService);
container.bind<IForecastsService>(types.ForecastsService).to(ForecastsService);
