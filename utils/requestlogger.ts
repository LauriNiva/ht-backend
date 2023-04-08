import { NextFunction, Request, Response } from 'express';

export default function requestlogger(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  console.log('---REQUEST LOGGER---');
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('Headers:  ', request.headers);
  console.log('^^------------^^');
  next();
}
