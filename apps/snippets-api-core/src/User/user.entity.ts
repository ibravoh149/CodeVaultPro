import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
