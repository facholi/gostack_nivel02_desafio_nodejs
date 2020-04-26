import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(400).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      error: 'Internal server error',
    });
  },
);

export default app;
