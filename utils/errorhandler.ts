import { NextFunction, Request, Response } from 'express';
import { MongoError } from 'mongodb';

export default function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log('errorHandler:', error);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    (error as MongoError).code === 11000
  ) {
    return response.status(400).json({ error: `must be unique` });
  }

  next(error);
}
