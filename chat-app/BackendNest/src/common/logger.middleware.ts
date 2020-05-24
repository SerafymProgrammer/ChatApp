import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // tslint:disable-next-line:ban-types
  use(req: Request, res: Response, next: Function) {
    // tslint:disable-next-line:no-console
    console.log(req);
    next();
  }
}
