import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;
let fakeUsersRepository: FakeUsersRepository;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Johnny',
      email: 'johnny@doe.com',
    });

    expect(updateUser.name).toBe('Johnny');
    expect(updateUser.email).toBe('johnny@doe.com');
  });

  it('should not be able to update email has already been used', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Username',
      email: 'teste@teste.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Johnny',
        email: 'john@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Johnny',
      email: 'johnny@doe.com',
      password: '123456',
      old_password: '123123',
    });

    expect(updateUser.password).toBe('123456');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Johnny',
      email: 'johnny@doe.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Johnny',
      email: 'johnny@doe.com',
      password: '123456',
      old_password: '564321',
    })).rejects.toBeInstanceOf(AppError);
  });
});
