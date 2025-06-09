import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedPermission } from './seed.permissions';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from '../permission/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
  ],
  providers: [SeedService, SeedPermission],
  exports: [SeedService],
})
export class SeedModule {}
