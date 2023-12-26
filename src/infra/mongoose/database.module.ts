import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from './database.config';
import { PrimaryDatabaseConfig } from './mongoose-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: PrimaryDatabaseConfig,
      connectionName: DATABASE_CONNECTION.PRIMARY,
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
