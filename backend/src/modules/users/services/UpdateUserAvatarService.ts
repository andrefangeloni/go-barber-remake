import fs from 'fs';
import path from 'path';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface Request {
  userId: string;
  avatarFilename?: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('user-not-found', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    if (avatarFilename) {
      user.avatar = avatarFilename;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
