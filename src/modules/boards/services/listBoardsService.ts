import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Boards from "../typeorm/entities/board";
import { BoardsRepository } from "../typeorm/repositories/boardRepository";

interface IRequest {
  projectId: string;
}

class ListBoardsService {
  public async execute({ projectId }: IRequest): Promise<Boards[]> {
    const boardRepository = getCustomRepository(BoardsRepository);
    const boards = await boardRepository.find({
      where: {
        project: projectId
      },
      order: {
        createdAt: "ASC",
      }
    });

    if (!boards) {
      throw new AppError('It was not possible find boards for this projectId');
    }

    return boards;

  }
}

export default ListBoardsService;
