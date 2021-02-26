import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { survey_id, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExist = await usersRepository.findOne({ email });

    if (!userAlreadyExist) {
      return response.status(400).json({ error: 'User does not exists!' });
    }

    const surveyAlreadyExist = await surveysRepository.findOne({ id: survey_id });

    if (!surveyAlreadyExist) {
      return response.status(400).json({ error: 'Survey does not exists!' });
    }

    // Salavar as informações na tabela SurveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExist.id,
      survey_id
    });

    await surveysUsersRepository.save(surveyUser);

    // Enviar email para o usuário
    return response.json(surveyUser);
  }
}

export { SendMailController };
