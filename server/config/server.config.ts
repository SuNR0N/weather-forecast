import { join } from 'path';

export const config = {
    basePath: '/api',
    port: 3000,
    citiesDumpRemote: 'http://bulk.openweathermap.org/sample/city.list.json.gz',
    citiesDumpLocal: join(__dirname, '../data/city.list.json'),
    forecastAPIUrl: 'http://api.openweathermap.org/data/2.5/forecast',
    forecastAPIKey: process.env.FORECAST_API_KEY,
};
