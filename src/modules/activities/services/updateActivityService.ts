import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Activities from "../typeorm/entities/activity";
import { ActivitiesRepository } from "../typeorm/repositories/activityRepository";

interface IRequest {
  id: string;
  description: string;
  status: string;
  employmentId: string;
  boardId: string;
}

class UpdateActivityService {
  public async execute({ id, description, status, employmentId, boardId }: IRequest): Promise<Activities> {
    const activityRepository = getCustomRepository(ActivitiesRepository);
    const activityExists = await activityRepository.findOne(id);

    if (!activityExists) {
      throw new AppError('Activity does not exist');
    }

    const activity = activityExists;
    activity.description = description;
    activity.status = status;
    activity.employment = employmentId;
    activity.board = boardId;

    const updatedActivity = await activityRepository.save(activity);

    return updatedActivity;

  }
}

export default UpdateActivityService;
