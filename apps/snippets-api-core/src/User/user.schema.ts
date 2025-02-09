import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SoftDeletePlugin } from '@repo/api-commons';

export type UserDocument = mongoose.HydratedDocument<User>;

type Profile = {
  avatar: string;
  location: string;
};

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  isActive: boolean;

  @Prop()
  verificationToken: string;

  @Prop(mongoose.Schema.Types.Date)
  verifiedOn: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }])
  roles: string[];

  @Prop()
  resetpasswordtoken: string;

  @Prop(mongoose.Schema.Types.Date)
  resetpasswordexpires: Date;

  @Prop()
  socialId: string;

  @Prop({ required: true })
  authProvider: string; //(google,local, github)=>default= local

  @Prop()
  profile: Profile;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  async softDelete() {
    this.deletedAt = new Date();
    await this.save()
  }

  async restore() {
    this.deletedAt = null;
    await this.save();
  }
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(SoftDeletePlugin);
export { UserSchema };
