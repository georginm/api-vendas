import { auth } from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import UnauthorizedError from '@shared/errors/UnauthorizedError';

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, auth.secret);
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid Token.');
  }
};

export { ensureAuthenticated };
