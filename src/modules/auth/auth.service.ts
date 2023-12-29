import { Injectable, Logger } from '@nestjs/common';
import UsersRepository from '../users/users.repository';
import { LoginDto } from './types/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthService {
  private logger = new Logger();
  private config = new ConfigService();
  constructor(private readonly usersRepository: UsersRepository) {}

  async login(login: LoginDto) {
    try {
      const user = await this.usersRepository.findOne({ email: login.email });

      if (!user) throw new Error('User not found.');

      const isPasswordValid = bcrypt.compareSync(login.password, user.password);

      if (!isPasswordValid) throw new Error('Invalid password.');

      // here you can do whatever you want with the user data like generate a token
      // example: creating a jwt token with the user data and the secret key from the .env file (JWT_SECRET) with 1 day of expiration
      const { _id: id, email } = user;
      const token = jwt.sign({ id, email }, this.config.get('JWT_SECRET'), { expiresIn: '1d' });

      this.logger.verbose(`user logged in > ${user.email}`);
      return { ...user, token };
    } catch (error) {
      throw error;
    }
  }
}
