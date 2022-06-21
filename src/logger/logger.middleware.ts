import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from './winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    logger.info('HTTP Request', {
      requesterIP: req.ip,
      headers: req.headers,
      method: req.method,
      url: `${req.protocol}://${req.hostname}${req.originalUrl}`,
      query: req.query,
      body: req.body,
    });
    next();
  }
}
