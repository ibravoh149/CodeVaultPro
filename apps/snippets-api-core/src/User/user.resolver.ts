import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.entity';

@Resolver()
export class UserResolver {
  constructor() {}

  @Query(() => User)
  async user() {
    return {
      lastName: 'Journal',
      firstName: 'Cater',
    };
  }
}
