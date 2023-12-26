import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from './database.config';

@Injectable()
export class PrimaryDatabaseConfig implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    // infos about the database connection has to be in the .env file
    const username = this.config.get('DATABASE_USER');
    const password = this.config.get('DATABASE_PASSWORD');
    const host = this.config.get('DATABASE_HOST');

    const uri = `mongodb+srv://${username}:${password}@${host}/${DATABASE_CONNECTION.PRIMARY}?retryWrites=true&w=majority`;

    return {
      uri,
    };
  }
}
