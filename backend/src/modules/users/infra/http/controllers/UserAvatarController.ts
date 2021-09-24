import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      userId: req.user.id,
      avatarFilename: req.file?.filename,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return res.json(userWithoutPassword);
  }
}
