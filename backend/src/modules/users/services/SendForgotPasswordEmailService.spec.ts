import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@doe.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
