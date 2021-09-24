import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface Request {
  date: Date;
  providerId: string;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentsInSameDate) {
      throw new AppError('appointment-already-booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id: providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
