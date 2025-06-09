import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.authGuard';
import { CurrentUser } from '../auth/auth.current.user';

@Resolver()
export class PermissionResolver {
  constructor() {}

  // @UseGuards(GqlAuthGuard)
  // @Query(() => User)
  // async user(@CurrentUser() user: User) {
  //   return user;
  // }
}
