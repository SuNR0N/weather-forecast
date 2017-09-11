import {
    IClouds,
    IMain,
    ISnow,
    ISys,
    IWeather,
    IWind,
} from './';

export interface IForecast {
    clouds: IClouds;
    dt: number;
    dt_txt: string;
    main: IMain;
    snow: ISnow;
    sys: ISys;
    weather: IWeather[];
    wind: IWind;
}
