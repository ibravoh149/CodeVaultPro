import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserSignUp } from './auth.entity';
import { AuthService } from './auth.service';
import { UserSignUpDTO } from './auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserSignUp)
  async signUp(@Args('userSignUp') userSignUp: UserSignUpDTO) {
    const { email, password } = userSignUp;
    try {
      await this.authService.create({ email, password });
      return { message: 'successfully a created profile' };
    } catch (error) {
      return error;
    }
  }
}
