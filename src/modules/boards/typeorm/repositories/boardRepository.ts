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
}
