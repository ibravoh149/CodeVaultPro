import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSignUp {
  @Field()
  message: string;
}
