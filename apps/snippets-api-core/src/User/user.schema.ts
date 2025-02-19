import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SoftDeletePlugin,HashPasswordPlugin } from '@repo/api-commons';

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

  @Prop(Date)
  verifiedOn: Date;

  // @Prop({
  //   type: [
  //     { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  //   ],
  // })
  // roles: string[];

  @Prop()
  resetpasswordtoken: string;

  @Prop(Date)
  resetpasswordexpires: Date;

  @Prop()
  socialId: string;

  @Prop({ default: 'local', enum: ['local', 'google', 'github'] })
  authProvider: string; //(google,local, github)=>default= local

  @Prop()
  verificationExpiresAt?: Date;

  @Prop(raw({
    avatar: {type:String},
    location: {type:String}
  }))
  profile: Profile;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  async softDelete() {
    this.deletedAt = new Date();
    await this.save();
  }

  async restore() {
    this.deletedAt = null;
    await this.save();
  }
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(SoftDeletePlugin);
UserSchema.plugin(HashPasswordPlugin)
export { UserSchema };
