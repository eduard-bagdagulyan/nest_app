import { Injectable } from '@nestjs/common';
import { logger } from './winston';
import { ILoggerParams } from './interfaces/logger-params';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerService {
  private readonly correlationId: string;

  constructor() {
    this.correlationId = uuidv4();
  }

  log(type, params: ILoggerParams) {
    const copyParams = { ...params };

    if (!copyParams.correlationId) {
      copyParams.correlationId = this.correlationId;
    }

    logger.log(type, copyParams);
  }

  info(params: ILoggerParams): void {
    this.log('info', params);
  }

  error(params: ILoggerParams): void {
    this.log('error', params);
  }

  debug(params: ILoggerParams): void {
    this.log('debug', params);
  }

  warn(params: ILoggerParams): void {
    this.log('warn', params);
  }
}
