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

  public async listEmploymentsProject(projectId: string) {
    const employments = await this.query(`
    select e.* from employments e
    join projects p on p.id = e.projectId
    where e.projectId = "${projectId}";
    `);

    return employments;
  }
}
