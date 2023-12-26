import { Injectable, Logger } from '@nestjs/common';
import UsersRepository from '../users/users.repository';
import { LoginDto } from './types/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class AuthService {
  private logger = new Logger();
  constructor(private readonly usersRepository: UsersRepository) {}

  async login(login: LoginDto) {
    try {
      const user = await this.usersRepository.findOne({ email: login.email });

      if (!user) throw new Error('User not found.');

      const isPasswordValid = bcrypt.compareSync(login.password, user.password);

      if (!isPasswordValid) throw new Error('Invalid password.');

      this.logger.verbose(`user logged in > ${user.email}`);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
