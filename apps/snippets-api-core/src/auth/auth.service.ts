import { Injectable } from '@nestjs/common';
import { UserSignUpDTO } from './auth.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async create(userDTO: UserSignUpDTO) {
    await this.userService.create(userDTO);
  }
}
