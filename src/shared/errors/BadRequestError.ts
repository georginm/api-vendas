import { AppError } from './AppError';

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export { BadRequestError };
