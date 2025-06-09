import { Injectable } from '@nestjs/common';
import { SeedPermission } from './seed.permissions';
import { Promise as Bluebird } from 'bluebird';

@Injectable()
export class SeedService {
  private readonly seeders = [];
  constructor(private readonly seedPermission: SeedPermission) {
    this.seeders = [this.seedPermission];
  }

  async seed() {
    Bluebird.each(this.seeders, async (seeder)=>{
    console.log('seeding ' + seeder.constructor.name);
      await seeder.seed()
    })
  }
}
