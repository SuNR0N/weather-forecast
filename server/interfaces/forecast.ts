import {
    IClouds,
    IMain,
    IRain,
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
    rain?: IRain;
    snow?: ISnow;
    sys: ISys;
    weather: IWeather[];
    wind: IWind;
}
