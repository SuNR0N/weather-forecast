import {
    IDailyForecast,
    IForecast,
} from '../shared/interfaces';

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

const iconMap: Map<string, string> = new Map([
    ['Rain', 'fa-tint'],
    ['Clouds', 'fa-cloud'],
    ['Clear', 'fa-sun-o'],
    ['Snow', 'fa-snowflake-o'],
]);

export class DailyForecast implements IDailyForecast {
    public forecasts: IForecast[];
    public closestForecast: IForecast;

    constructor(forecasts: IForecast[]) {
        this.forecasts = forecasts;
        this.closestForecast = this.getClosestForecast();
    }

    public get day(): string {
        const day = new Date(this.closestForecast.dt * 1000).getDay();
        return days[day];
    }

    public isToday(): boolean {
        const today = new Date().toDateString();
        const forecastDay = new Date(this.closestForecast.dt * 1000).toDateString();
        return today === forecastDay;
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
            return iconMap.get(this.closestForecast.weather[0].main) || '';
        } else {
            return '';
        }
    }

    public get temperature(): number {
        return Math.round(this.closestForecast.main.temp - kelvin);
    }

    public get avgTemperature(): number {
        const temperatures = this.forecasts.map((forecast) => forecast.main.temp);
        const sum = temperatures.reduce((previous, current) => {
            previous += current;
            return previous;
        }, 0);
        return Math.round(sum / temperatures.length - kelvin);
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

    public get totalRain(): number {
        const total = this.forecasts.reduce((previous, current) => {
            if (current.rain && current.rain['3h']) {
                previous += current.rain['3h'];
            }
            return previous;
        }, 0);
        return total;
    }

    public get snow(): number {
        return (this.closestForecast.snow && this.closestForecast.snow['3h']) || 0;
    }

    public get totalSnow(): number {
        const total = this.forecasts.reduce((previous, current) => {
            if (current.snow && current.snow['3h']) {
                previous += current.snow['3h'];
            }
            return previous;
        }, 0);
        return total;
    }

    public get humidity(): number {
        return this.closestForecast.main.humidity;
    }

    public get avgHumidity(): number {
        const humidities = this.forecasts.map((forecast) => forecast.main.humidity);
        const sum = humidities.reduce((previous, current) => {
            previous += current;
            return previous;
        }, 0);
        return sum / humidities.length;
    }

    public get wind(): number {
        return this.closestForecast.wind.speed * mpsToMphConversionRate;
    }

    public get avgWind(): number {
        const winds = this.forecasts.map((forecast) => forecast.wind.speed);
        const sum = winds.reduce((previous, current) => {
            previous += current;
            return previous;
        }, 0);
        return sum / winds.length;
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
        return iconMap.get(m) || '';
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
