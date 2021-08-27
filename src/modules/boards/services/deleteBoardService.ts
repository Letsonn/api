import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Boards from "../typeorm/entities/board";
import { BoardsRepository } from "../typeorm/repositories/boardRepository";

interface IRequest {
  id: string;
}

class DeleteBoardService {
  public async execute({ id }: IRequest): Promise<Boards> {
    const boardRepository = getCustomRepository(BoardsRepository);
    const board = await boardRepository.findById(id);

    if (!board) {
      throw new AppError('Board does not exist');
    }

    const deletedBoard = await boardRepository.remove(board);

    return deletedBoard;
  }
}

export default DeleteBoardService;
