import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Users from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/userRepository";

interface IRequest {
  userId: string;
}

class ListUserService {
  public async execute({ userId }: IRequest): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    return user;
  }
}


export default ListUserService;
