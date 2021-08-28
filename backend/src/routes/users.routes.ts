import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  res.status(201).json(userWithoutPassword);
});

usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

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
  },
);

export default usersRouter;
