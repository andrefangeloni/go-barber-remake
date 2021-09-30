import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfileService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let showProfile: ShowProfileService;
let fakeUsersRepository: FakeUsersRepository;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@doe.com');
  });

  it('should not be able to show inexistent profile', async () => {
    await expect(
      showProfile.execute({
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
