import { Role } from "@modules/employments/typeorm/enum/employmentEnum";
import { EntityRepository, getConnection, IsNull, Not, Repository } from "typeorm";
import Project from "../entities/projects";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public async updateProject(project: Project) {

  }

  public async findProjectsByUserId(userId: string) {
    const projects = await this.query(`
    select
      p.id as projectId,
      p.name as projectName,
      p.createdAt,
      p.updatedAt,
      e.id as employmentId,
      e.role as employmentRole
    from projects p
    inner join employments e on p.id = e.projectId
    where e.userId = '${userId}';
    `);

    return projects;
  }
}

