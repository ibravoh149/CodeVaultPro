import { Injectable } from '@nestjs/common';
import { UserLoginDTO, UserSignUpDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(signUpDTO: UserSignUpDTO) {
    await this.userService.create(signUpDTO);
  }

  async login(loginDTO: UserLoginDTO) {
    const user = await this.userService.login(loginDTO);
    const tokenPayload = { sub: user._id, username: user.email };
    const { refresh_token, access_token } = await this.generateTokens(
      tokenPayload,
    );
    return { refresh_token, access_token };
  }

  private async generateTokens(payload: Record<string, unknown>) {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '120m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '219000m',
      secret:process.env.JWT_REFRESH_SECRET
    });
    // Todo, hash and store refresh token in refresh token collection/table
    return {
      access_token,
      refresh_token,
    };
  }
}
