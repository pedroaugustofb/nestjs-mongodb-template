import { Injectable } from '@nestjs/common';
import UsersRepository from './users.repository';
import { CreateUserDto } from './types/create-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private config: ConfigService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      // here we can add some business logic
      if (await this.usersRepository.findOne({ email: user.email })) throw new Error('User already exists');

      return await this.usersRepository.create({
        ...user,
        password: await bcrypt.hash(user.password, this.config.get('PASSWORD_SALT')),
      });
    } catch (error) {
      throw error;
    }
  }
}
