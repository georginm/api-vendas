import { AppError } from './AppError';

class TooManyRequestsError extends AppError {
  constructor(message: string) {
    super(message, 429);
  }
}

export { TooManyRequestsError };
