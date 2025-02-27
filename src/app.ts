
import express, { Request, Response, NextFunction } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorHandler } from './routers/error';
import ticketsRouter from './routers/tickets';
import { logger } from './utils/logger';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    logger.info("Health check OK");
    res.send("health check OK");
});
app.use('/tickets',ticketsRouter);
app.use(errorHandler);

export default app;
export const handler = serverless(app);
