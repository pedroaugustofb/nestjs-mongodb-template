import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';
import { CreateUserDto } from './types/create-user.dto';

@Injectable()
export default class UsersRepository {
  constructor(@InjectModel(User.name, DATABASE_CONNECTION.PRIMARY) private userModel: Model<UserDocument>) {}

  // find a user by query
  findOne = async (query: Partial<User>): Promise<User> => await this.userModel.findOne(query).exec();

  // create a new user
  create = async (user: CreateUserDto): Promise<User> => {
    const createdUser = await this.userModel.create({
      ...user,
      createdAt: new Date(),
    });

    return createdUser.save();
  };
}
