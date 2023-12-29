import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ autopopulate: true })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  readonly created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
