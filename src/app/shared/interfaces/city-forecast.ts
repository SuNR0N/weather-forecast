import {
    ICity,
    IForecast,
} from './';

export interface ICityForecast {
    city: ICity;
    cnt: number;
    cod: string;
    list: IForecast[];
    message: number;
}
