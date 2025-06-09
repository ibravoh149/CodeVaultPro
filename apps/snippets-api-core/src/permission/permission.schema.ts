import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SoftDeletePlugin } from '@repo/api-commons';

export type PermissionDocument = mongoose.HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

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

const PermissionSchema = SchemaFactory.createForClass(Permission);
PermissionSchema.plugin(SoftDeletePlugin);
export { PermissionSchema };
