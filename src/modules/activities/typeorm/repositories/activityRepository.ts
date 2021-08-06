import { EntityRepository, Repository } from "typeorm";
import Activities from "../entities/activity";

@EntityRepository(Activities)
export class ActivitiesRepository extends Repository<Activities> {
  public async findById(id: string) {
    const activity = await this.findOne({
      where: {
        id
      }
    });

    return activity;
  }
}
