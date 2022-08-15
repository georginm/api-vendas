import upload from '@config/upload';
import { User } from '@modules/users/infra/typeorm/entities/Users';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import { S3StorageProvider } from '@shared/providers/StorageProvider/implementations/S3StorageProvider';

interface IRequest {
  userId: string;
  avatar: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatar }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    let storageProvider;
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (upload.driver === 's3') {
      storageProvider = new S3StorageProvider();
    } else {
      storageProvider = new DiskStorageProvider();
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
    }

    const fileName = await storageProvider.saveFile(avatar);
    user.avatar = fileName;
    await usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
