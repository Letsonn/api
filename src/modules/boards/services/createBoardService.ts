import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Boards from "../typeorm/entities/board";
import { BoardsRepository } from "../typeorm/repositories/boardRepository";

interface IRequest {
  name: string;
  projectId: string;
}

class CreateBoardService {
  public async execute({ name, projectId }: IRequest): Promise<Boards> {
    const boardRepository = getCustomRepository(BoardsRepository);
    const boardExists = await boardRepository.findByName(name, projectId);

    if (boardExists) {
      throw new AppError('Board alredy exists in this project');
    }

    const board = boardRepository.create({
      name,
      project: projectId,
    });

    await boardRepository.save(board);

    return board;
  }
}

export default CreateBoardService;
