import { IForecast } from '../shared/interfaces/forecast';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const mpsToMphConversionRate = 2.236936;
const kelvin = 273.15;

enum Icon {
    Rain = 'fa-tint',
    Clouds = 'fa-cloud',
    Clear = 'fa-sun-o',
    Snow = 'fa-snowflake-o',
}

export class DailyForecast {
    public forecasts: IForecast[];
    private closestForecast: IForecast;

    constructor(forecasts: IForecast[]) {
        this.forecasts = forecasts;
        this.closestForecast = this.getClosestForecast();
    }

    public get day(): string {
        const day = new Date(this.closestForecast.dt * 1000).getDay();
        return days[day];
    }

    public get description(): string {
        if (this.closestForecast && this.closestForecast.weather[0]) {
            return this.closestForecast.weather[0].description;
        } else {
            return 'Unknown';
        }
    }

    public get icon(): string {
        if (this.closestForecast && this.closestForecast.weather[0]) {
            return Icon[this.closestForecast.weather[0].main];
        } else {
            return '';
        }
    }

    public get temperature(): number {
        return Math.round(this.closestForecast.main.temp - kelvin);
    }

    public get minTemperature(): number {
        const minimums = this.forecasts.map((forecast) => forecast.main.temp_min);
        return Math.round(Math.min(...minimums) - kelvin);
    }

    public get maxTemperature(): number {
        const maximums = this.forecasts.map((forecast) => forecast.main.temp_max);
        return Math.round(Math.max(...maximums) - kelvin);
    }

    public get rain(): number {
        return (this.closestForecast.rain && this.closestForecast.rain['3h']) || 0;
    }

    public get snow(): number {
        return (this.closestForecast.snow && this.closestForecast.snow['3h']) || 0;
    }

    public get humidity(): number {
        return this.closestForecast.main.humidity;
    }

    public get wind(): number {
        return this.closestForecast.wind.speed * mpsToMphConversionRate;
    }

    public get mainIcon(): string {
        const mains = this.forecasts.reduce((previous, current) => {
            if (current.weather[0]) {
                previous.push(current.weather[0].main);
            }
            return previous;
        }, []);
        const map: Map<string, number> = new Map();
        mains.forEach((value) => {
            let currentCount = map.get(value);
            if (!currentCount) {
                map.set(value, 1);
            } else {
                map.set(value, ++currentCount);
            }
        });
        let m: string;
        let max: number;
        for (const [value, count] of map) {
            if (!max || count > max) {
                max = count;
                m = value;
            }
        }
        return Icon[m];
    }

    private getClosestForecast(): IForecast {
        const now = new Date().getTime();
        let min: number;
        let closest: IForecast;
        this.forecasts.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000).getTime();
            const diff = Math.abs(now - date);
            if (!min || diff < min) {
                closest = forecast;
                min = diff;
            }
        });
        return closest;
    }
}
