import { ShowProfileService } from '@modules/users/services/profileServices/ShowProfileServices';
import { Request, Response } from 'express';

class ShowProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showUser = new ShowProfileService();

    const user = await showUser.execute({ userId });

    return response.json(user);
  }
}

export { ShowProfileController };
