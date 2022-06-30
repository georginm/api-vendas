import { ListUserService } from '@modules/users/services/userServices/ListUserService';
import { Request, Response } from 'express';

class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return response.json(users);
  }
}

export { ListUsersController };
