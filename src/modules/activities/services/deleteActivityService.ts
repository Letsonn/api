import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Activities from "../typeorm/entities/activity";
import { ActivitiesRepository } from "../typeorm/repositories/activityRepository";

interface IRequest {
  id: string;
}

class DeleteActivityService {
  public async execute({ id }: IRequest): Promise<Activities> {
    const activityRepository = getCustomRepository(ActivitiesRepository);

    const activity = await activityRepository.findOne(id);

    if (!activity) {
      throw new AppError('Activity does not exist');
    }

    const deletedActivity = await activityRepository.remove(activity);

    return deletedActivity;
  }
}

export default DeleteActivityService;
