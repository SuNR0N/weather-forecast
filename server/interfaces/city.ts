import { ICoordinate } from './coordinate';

export interface ICity {
    coord: ICoordinate;
    country: string;
    id: number;
    name: string;
}
