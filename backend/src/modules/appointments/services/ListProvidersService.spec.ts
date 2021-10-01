import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ListProvidersService from './ListProvidersService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let listProviders: ListProvidersService;
let fakeUsersRepository: FakeUsersRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'john@tre.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'john@qua.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
