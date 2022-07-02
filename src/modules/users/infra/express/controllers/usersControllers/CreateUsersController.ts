import { CreateUserService } from '@modules/users/services/userServices/CreateUserService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    return response.json(instanceToInstance(user));
  }
}

export { CreateUsersController };
