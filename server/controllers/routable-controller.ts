import { Router } from 'express';
import { injectable } from 'inversify';

export interface IRoutableController {
    getRouter(): Router;
    getRouterPath(): string;
}

@injectable()
export abstract class RoutableController implements IRoutableController {
    protected router: Router;

    constructor(private routerPath: string) {
        this.router = Router();
    }

    abstract getRouter(): Router;

    getRouterPath(): string {
        return this.routerPath;
    }
}
