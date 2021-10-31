import { EntityRepository, Repository } from "typeorm";
import Boards from "../entities/board";

@EntityRepository(Boards)
export class BoardsRepository extends Repository<Boards> {
  public async findById(id: string) {
    const board = await this.findOne({
      where: {
        id
      }
    });

    return board;
  }

  public async findByName(name: string, project: string) {
    const board = await this.findOne({
      where: {
        name,
        project,
      }
    });

    return board;
  }

  public async findBoardInfo(id: string) {
    const board = await this.query(`
    select *,b.id as id, b.name as status from boards b
    inner join projects p on p.id = b.projectId
    where b.id = "${id}";
    `);

    return board;
  }
}
