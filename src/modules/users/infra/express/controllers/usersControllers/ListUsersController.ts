import { ListUserService } from '@modules/users/services/userServices/ListUserService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return response.json(instanceToInstance(users));
  }
}

export { ListUsersController };
