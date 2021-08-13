import { EntityRepository, Repository } from 'typeorm';
import Employments from '../entities/empĺoyment';

@EntityRepository(Employments)
export class EmploymentsRepository extends Repository<Employments> {
  public async findByProjectsIdAndUserId(projectId: string, userId: string) {
    const employment = await this.findOne({
      where: {
        project: projectId,
        user: userId
      }
    });

    return employment;
  }
}
