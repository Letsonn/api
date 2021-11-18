import { EntityRepository, Repository } from "typeorm";
import Activities from "../entities/activity";

@EntityRepository(Activities)
export class ActivitiesRepository extends Repository<Activities> {
  public async findById(id: string) {
    const activity = await this.query(`
    select *  from activities where id = "${id}";
    `);

    return activity;
  }

  public async findByBoardId(boardId: string) {
    const activities = await this.find({
      where: {
        board: boardId
      },
      select: ['id', 'status', 'employment', 'description', 'board', 'createdAt', 'updatedAt']
    });

    return activities;
  }
}
