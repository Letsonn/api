import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import { UserRepository } from '../typeorm/repositories/userRepository';

class ListUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
    });

    return users;
  }
}

export default ListUsersService
