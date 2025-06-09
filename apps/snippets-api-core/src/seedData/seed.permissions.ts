import { Injectable } from '@nestjs/common';
import { Permission } from '../permission/permission.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { permissionSeedData } from '../permission/permissionSeedData';

@Injectable()
export class SeedPermission {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  async seed() {
    const permissions = await this.permissionModel.countDocuments();
    if (permissions <= 0) {
      await this.permissionModel.insertMany(permissionSeedData);
    }
  }
}
