import { EntityRepository, Repository } from "typeorm";
import Project from "../entities/projects";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public async findById(id: string): Promise<Project | undefined> {

  }
}
