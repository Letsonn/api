import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Activities from "../typeorm/entities/activity";
import { ActivitiesRepository } from "../typeorm/repositories/activityRepository";

interface IRequest {
    boardId: string;
}

class ListActivitiesFromBoard {
    public async execute({ boardId }: IRequest): Promise<Activities[]> {
        const activityRepository = getCustomRepository(ActivitiesRepository);

        const activities = await activityRepository.findByBoardId(boardId);
        
        if (!activities) {
            throw new AppError('Activities does not exits');
        }

        return activities
    }
}

export default ListActivitiesFromBoard;