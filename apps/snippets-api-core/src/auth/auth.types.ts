import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSignUp {
  @Field()
  message: string;
}

@ObjectType()
export class Login {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
