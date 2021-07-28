import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/userRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, '1980079f11a39b8c53aba66e1d607388', {
      subject: user.id,
      expiresIn: '1d',
    });

    //Criar método para adicionar o token na tabela de usuários

    return {
      user,
      token
    }
  }
}

export default CreateSessionsService;
