import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface Request {
  email: string;
}

@injectable()
class SendForgotEmailPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido.',
    );
  }
}

export default SendForgotEmailPasswordService;
