import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Activities from "../typeorm/entities/activity";
import { ActivitiesRepository } from "../typeorm/repositories/activityRepository";

interface IRequest {
  status: string;
  description: string;
  employmentId: string;
  boardId: string;
}

class CreateActivityService {
  public async execute({ status, description, employmentId, boardId }: IRequest): Promise<Activities> {
    const acitivityRepository = getCustomRepository(ActivitiesRepository);

    try {
      const activity = acitivityRepository.create({
        status,
        employment: employmentId,
        description,
        board: boardId
      });

      await acitivityRepository.save(activity);

      return activity;
    } catch (err) {
      console.log(err);
      throw new AppError('Falha ao criar a atividade');
    }

  }
}

export default CreateActivityService;
