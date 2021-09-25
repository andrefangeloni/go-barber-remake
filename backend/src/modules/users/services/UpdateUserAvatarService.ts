import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  userId: string;
  avatarFilename?: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('user-not-found', 404);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    if (avatarFilename) {
      const filename = await this.storageProvider.saveFile(avatarFilename);
      user.avatar = filename;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
