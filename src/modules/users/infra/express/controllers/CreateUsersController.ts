import { CreateUserService } from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';

class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }
}

export { CreateUsersController };
