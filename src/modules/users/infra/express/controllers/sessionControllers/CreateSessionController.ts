import { CreateSessionService } from '@modules/users/services/sessionServices/CreateSessionService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();

    const user = await createSession.execute({ email, password });

    return response.json(instanceToInstance(user));
  }
}

export { CreateSessionController };
