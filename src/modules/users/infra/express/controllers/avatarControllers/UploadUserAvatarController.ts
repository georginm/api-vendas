import { UpdateUserAvatarService } from '@modules/users/services/avatarServices/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import { BadRequestError } from '@shared/errors/BadRequestError';

class UploadUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const { id } = request.user;
    const avatar = request.file?.filename;

    if (!avatar) throw new BadRequestError('avatar was not provided');

    const user = await updateAvatar.execute({ userId: id, avatar });

    return response.json(instanceToInstance(user));
  }
}

export { UploadUserAvatarController };
