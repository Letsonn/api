import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Boards from "../typeorm/entities/board";
import { BoardsRepository } from "../typeorm/repositories/boardRepository";

interface IRequest {
  boardId: string;
}

class ListBoard {
  public async execute({ boardId }: IRequest): Promise<Boards> {
    const boardRepository = getCustomRepository(BoardsRepository);
    const board = await boardRepository.findBoardInfo(boardId);

    if (!board) {
      throw new AppError('Not found board');
    }

    return board;
  }
}

export default ListBoard;
