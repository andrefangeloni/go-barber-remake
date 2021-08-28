import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import uploadConfig from '../config/upload';

import User from '../models/User';

interface Request {
  userId: string;
  avatarFilename?: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new Error('User not found!');
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

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
