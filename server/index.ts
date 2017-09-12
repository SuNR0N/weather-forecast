import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { join } from 'path';
import {
    config,
    container,
    types,
} from './config';
import { IRoutableController } from './controllers/routable-controller';
import { logger } from './utils/logger';

const app: express.Application = express();
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.json());

const controllers: IRoutableController[] = container.getAll<IRoutableController>(types.Controller);
controllers.forEach((controller) => {
    app.use(`${config.basePath}/${controller.getRouterPath()}`, controller.getRouter());
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err.stack);
    next(err);
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
});

app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(join(__dirname + '/../dist/index.html'));
});

app.listen(process.env.PORT || config.port, () => {
    logger.info(`Server app is listening on port ${process.env.PORT || config.port}!`);
});
