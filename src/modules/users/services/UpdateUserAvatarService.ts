import upload from 'config/upload';
import fs from 'fs';
import path from 'path';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

import { IUploadUserAvatarDTO } from '../dto/IUploadUserAvatarDTO';
import { User } from '../infra/typeorm/entities/Users';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFileName,
  }: IUploadUserAvatarDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
