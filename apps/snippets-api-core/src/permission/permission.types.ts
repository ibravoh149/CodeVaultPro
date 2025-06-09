import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum RoleCategory {
  BASIC = 'BASIC',
  SHARING_AND_COLLABORATION = 'SHARING_AND_COLLABORATION',
  ADMIN_TEAM_MANAGEMENT = 'ADMIN_TEAM_MANAGEMENT',
  ADVANCE_FEATURES = 'ADVANCE_FEATURES',
}

registerEnumType(RoleCategory, { name: 'RoleCategory' });

@ObjectType()
export class Permission {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => RoleCategory)
  category: RoleCategory;
}
