import { readFile } from 'fs';
import * as HttpStatus from 'http-status-codes';
import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { gunzip } from 'zlib';
import { config } from '../config/server.config';
import { ICity } from '../interfaces/city';
import { logger } from '../utils/logger';

export interface ICitiesService {
    find(query?: string): Promise<ICity[]>;
}

@injectable()
export class CitiesService implements ICitiesService {
    private cities: ICity[] = [];

    constructor() {
        this.initCities();
    }

    public async find(query?: string): Promise<ICity[]> {
        query = query ? query.toLowerCase() : '';
        const cities: ICity[] = await this.cities.filter((city) => {
            return city.name.toLowerCase().includes(query);
        });

        return cities;
    }

    private initCities(): void {
        this.getCitiesDumpFromRemoteLocation(config.citiesDumpRemote)
            .then((json: ICity[]) => {
                this.cities = json.sort(this.sortByName);
                logger.info(`${this.cities.length} cities have been loaded from remote file`);
            })
            .catch((remoteError) => {
                logger.debug(`Dump file cannot be fetched from '${config.citiesDumpRemote}', falling back to local file`);
                this.getCitiesDumpFromLocalLocation(config.citiesDumpLocal)
                    .then((json: ICity[]) => {
                        this.cities = json.sort(this.sortByName);
                        logger.info(`${this.cities.length} cities have been loaded from local file`);
                    })
                    .catch((localError) => {
                        logger.debug(`Dump file cannot be read from '${config.citiesDumpLocal}'`);
                    });
            });
    }

    private async getCitiesDumpFromRemoteLocation(url: string): Promise<ICity[] | void> {
        const json = await fetch(url)
            .then((response) => {
                if (response.status === HttpStatus.OK) {
                    return response.buffer();
                } else {
                    const error = new Error(response.statusText);
                    return Promise.reject(error);
                }
            })
            .then((buffer) => {
                return new Promise<ICity[]>((resolve, reject) => {
                    return gunzip(buffer, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(JSON.parse(data.toString()));
                    });
                });
            });
        return json;
    }

    private async getCitiesDumpFromLocalLocation(path: string): Promise<ICity[] | void> {
        const json = await new Promise<ICity[]>((resolve, reject) => {
            readFile(path, (error, data) => {
                if (error) {
                    reject(error);
                } else if (!data) {
                    reject('Data is undefined');
                } else {
                    resolve(JSON.parse(data.toString()));
                }
            });
        });
        return json;
    }

    private sortByName(first: ICity, second: ICity): number {
        if (first.name < second.name) {
            return -1;
        } else if (first.name > second.name) {
            return 1;
        } else {
            return 0;
        }
    }
}
