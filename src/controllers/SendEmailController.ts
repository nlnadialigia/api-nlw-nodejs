import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UserRepository } from '../repositories/UserRepository';

class SendEmailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (!userAlreadyExists) {
      return response.status(400).json({ error: 'User does not Existss!' });
    }

    const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id });

    if (!surveyAlreadyExists) {
      return response.status(400).json({ error: 'Survey does not Existss!' });
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id
    });

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { SendEmailController };
