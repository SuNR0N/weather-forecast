import { IForecast } from './forecast';

export interface IDailyForecast {
    avgHumidity: number;
    avgTemperature: number;
    avgWind: number;
    day: string;
    description: string;
    forecasts: IForecast[];
    humidity: number;
    icon: string;
    mainIcon: string;
    maxTemperature: number;
    minTemperature: number;
    rain: number;
    snow: number;
    temperature: number;
    totalRain: number;
    totalSnow: number;
    wind: number;
    isToday(): boolean;
}
