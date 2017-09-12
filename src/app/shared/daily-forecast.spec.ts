import { DailyForecast } from './daily-forecast';
import { IForecast } from './interfaces/forecast';

describe('DailyForecast', () => {
    describe('constructor', () => {
        it('it should calculate the closest forecast', () => {
            const dtPast1 = new Date(2016, 5, 8).getTime() / 1000;
            const dtPast2 = new Date(2017, 0, 1).getTime() / 1000;
            const dtNow = Math.round(new Date().getTime() / 1000);
            const forecasts: IForecast[] = [
                {
                    dt: dtPast1,
                } as any,
                {
                    dt: dtNow,
                } as any,
                {
                    dt: dtPast2,
                } as any,
            ];
            const df = new DailyForecast(forecasts);

            expect(df.closestForecast).toBe(forecasts[1]);
        });
    });

    describe('day', () => {
        it('should return the name of the day based on the closest forecast', () => {
            const mondayDt = new Date(2017, 8, 11).getTime() / 1000;
            const df = new DailyForecast([
                {
                    dt: mondayDt,
                } as any,
            ]);

            expect(df.day).toEqual('Monday');
        });
    });

    describe('isToday', () => {
        it('should return true if the closest forecast is for today', () => {
            const dtNow = new Date().getTime() / 1000;
            const df = new DailyForecast([
                {
                    dt: dtNow,
                } as any,
            ]);

            expect(df.isToday()).toBeTruthy();
        });

        it('should return false if the closest forecast is not for today', () => {
            const dt = new Date(2000, 0, 1).getTime() / 1000;
            const df = new DailyForecast([
                { dt } as any,
            ]);

            expect(df.isToday()).toBeFalsy();
        });
    });

    describe('description', () => {
        it('should return the description of weather if it exists', () => {
            const df = new DailyForecast([
                {
                    weather: [
                        {
                            description: 'Test',
                        },
                    ],
                } as any,
            ]);

            expect(df.description).toEqual('Test');
        });

        it('should return Unknown if the description of the weather does not exist', () => {
            const df = new DailyForecast([
                {
                    weather: [],
                } as any,
            ]);

            expect(df.description).toEqual('Unknown');
        });
    });

    describe('icon', () => {
        it('should return the mapped css class if the main descriptor of the weather exists', () => {
            const df = new DailyForecast([
                {
                    weather: [
                        {
                            main: 'Clear',
                        },
                    ],
                } as any,
            ]);

            expect(df.icon).toEqual('fa-sun-o');
        });

        it('should return an empty sring if the main descriptor of the weather has no mapping', () => {
            const df = new DailyForecast([
                {
                    weather: [
                        {
                            main: 'FooBar',
                        },
                    ],
                } as any,
            ]);

            expect(df.icon).toEqual('');
        });

        it('should return an empty sring if the main descriptor of the weather does not exist', () => {
            const df = new DailyForecast([
                {
                    weather: [],
                } as any,
            ]);

            expect(df.icon).toEqual('');
        });
    });

    describe('temperature', () => {
        it('should return the temperature from the closest forecast in celsius', () => {
            const df = new DailyForecast([
                {
                    main: {
                        temp: 300.12,
                    },
                } as any,
            ]);

            expect(df.temperature).toBe(27);
        });
    });

    describe('avgTemperature', () => {
        it('should return the average temperature from the forecasts in celsius', () => {
            const df = new DailyForecast([
                {
                    main: {
                        temp: 300.12,
                    },
                } as any,
                {
                    main: {
                        temp: 287.25,
                    },
                } as any,
            ]);

            expect(df.avgTemperature).toBe(21);
        });
    });

    describe('minTemperature', () => {
        it('should return the minimum temperature from the forecasts in celsius', () => {
            const df = new DailyForecast([
                {
                    main: {
                        temp_min: 300.12,
                    },
                } as any,
                {
                    main: {
                        temp_min: 287.25,
                    },
                } as any,
            ]);

            expect(df.minTemperature).toBe(14);
        });
    });

    describe('maxTemperature', () => {
        it('should return the maximum temperature from the forecasts in celsius', () => {
            const df = new DailyForecast([
                {
                    main: {
                        temp_max: 300.12,
                    },
                } as any,
                {
                    main: {
                        temp_max: 287.25,
                    },
                } as any,
            ]);

            expect(df.maxTemperature).toBe(27);
        });
    });

    describe('rain', () => {
        it('should return the amount of rain from the closest forecast if it exists', () => {
            const df = new DailyForecast([
                {
                    rain: {
                        '3h': 5.2,
                    },
                } as any,
            ]);

            expect(df.rain).toBe(5.2);
        });

        it('should return 0 as the amount of rain from the closest forecast if it does not exist', () => {
            const df = new DailyForecast([
                {
                    rain: {},
                } as any,
            ]);

            expect(df.rain).toBe(0);
        });
    });

    describe('totalRain', () => {
        it('should return the amount of daily rain from the forecasts', () => {
            const df = new DailyForecast([
                {
                    rain: {
                        '3h': 5.2,
                    },
                } as any,
                {
                    rain: {
                        '3h': 1.2,
                    },
                } as any,
                {
                    rain: {},
                } as any,
                {} as any,
            ]);

            expect(df.totalRain).toBe(6.4);
        });
    });

    describe('snow', () => {
        it('should return the amount of snow from the closest forecast if it exists', () => {
            const df = new DailyForecast([
                {
                    snow: {
                        '3h': 5.2,
                    },
                } as any,
            ]);

            expect(df.snow).toBe(5.2);
        });

        it('should return 0 as the amount of snow from the closest forecast if it does not exist', () => {
            const df = new DailyForecast([
                {
                    snow: {},
                } as any,
            ]);

            expect(df.snow).toBe(0);
        });
    });

    describe('totalSnow', () => {
        it('should return the amount of daily snow from the forecasts', () => {
            const df = new DailyForecast([
                {
                    snow: {
                        '3h': 5.2,
                    },
                } as any,
                {
                    snow: {
                        '3h': 1.2,
                    },
                } as any,
                {
                    snow: {},
                } as any,
                {} as any,
            ]);

            expect(df.totalSnow).toBe(6.4);
        });
    });

    describe('humidity', () => {
        it('should return the humidity from the closest forecast', () => {
            const df = new DailyForecast([
                {
                    main: {
                        humidity: 80.5,
                    },
                } as any,
            ]);

            expect(df.humidity).toBe(80.5);
        });
    });

    describe('avgHumidity', () => {
        it('should return the average humidity from the forecasts', () => {
            const df = new DailyForecast([
                {
                    main: {
                        humidity: 44,
                    },
                } as any,
                {
                    main: {
                        humidity: 78,
                    },
                } as any,
            ]);

            expect(df.avgHumidity).toBe(61);
        });
    });

    describe('wind', () => {
        it('should return the speed of the wind from the closest forecast', () => {
            const df = new DailyForecast([
                {
                    wind: {
                        speed: 6.78,
                    },
                } as any,
            ]);

            expect(df.wind).toBeCloseTo(15.166, 3);
        });
    });

    describe('avgWind', () => {
        it('should return the average wind speed from the forecasts', () => {
            const df = new DailyForecast([
                {
                    wind: {
                        speed: 1.23,
                    },
                } as any,
                {
                    wind: {
                        speed: 4.56,
                    },
                } as any,
            ]);

            expect(df.avgWind).toBeCloseTo(2.895, 3);
        });
    });

    describe('mainIcon', () => {
        it('should return the mapped css class for the most common main descriptor of forecasts', () => {
            const df = new DailyForecast([
                {
                    weather: [
                        {
                            main: 'Clear',
                        },
                    ],
                } as any,
                {
                    weather: [
                        {
                            main: 'Clear',
                        },
                    ],
                } as any,
                {
                    weather: [],
                } as any,
                {
                    weather: [
                        {
                            main: 'Clear',
                        },
                    ],
                } as any,
                {
                    weather: [
                        {
                            main: 'Rain',
                        },
                    ],
                } as any,
                {
                    weather: [
                        {
                            main: 'Snow',
                        },
                    ],
                } as any,
            ]);

            expect(df.mainIcon).toEqual('fa-sun-o');
        });

        it('should return an empty sring if the most common main descriptor of the weather has no mapping', () => {
            const df = new DailyForecast([
                {
                    weather: [
                        {
                            main: 'Clear',
                        },
                    ],
                } as any,
                {
                    weather: [
                        {
                            main: 'FooBar',
                        },
                    ],
                } as any,
                {
                    weather: [
                        {
                            main: 'FooBar',
                        },
                    ],
                } as any,
            ]);

            expect(df.mainIcon).toEqual('');
        });
    });
});
