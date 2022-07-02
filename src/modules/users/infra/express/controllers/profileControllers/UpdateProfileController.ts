import { UpdateProfileService } from '@modules/users/services/profileServices/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

class UpdateProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(instanceToInstance(user));
  }
}

export { UpdateProfileController };
