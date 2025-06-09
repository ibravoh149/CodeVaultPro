import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './permission.schema';
import { PermissionResolver } from './permission.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
  ],
  providers: [PermissionResolver],
})
export class PermissionModule {}
