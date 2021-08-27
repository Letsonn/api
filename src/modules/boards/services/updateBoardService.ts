import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Boards from "../typeorm/entities/board";
import { BoardsRepository } from "../typeorm/repositories/boardRepository";

interface IRequest {
  id: string;
  name: string;
}

class UpdateBoardService {
  public async execute({ id, name }: IRequest): Promise<Boards> {
    const boardRepository = getCustomRepository(BoardsRepository);
    const board = await boardRepository.findOne(id);

    if (!board) {
      throw new AppError('Board does not exist');
    }

    board.name = name;

    const updatedBoard = await boardRepository.save(board);

    return updatedBoard
  }
}

export default UpdateBoardService;
