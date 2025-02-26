import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.authGuard';
import { CurrentUser } from '../auth/auth.current.user';
@Resolver()
export class UserResolver {
  constructor() {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(@CurrentUser() user: User) {
    return user;
  }
}
