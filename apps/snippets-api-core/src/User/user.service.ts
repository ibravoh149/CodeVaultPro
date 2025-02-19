import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import crypto from 'crypto';
import { UserSignUpDTO } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(userDTO: UserSignUpDTO): Promise<User> {
    const exisitngUser = await this.userModel.findOne({ email: userDTO.email });
    if (exisitngUser) {
      throw new ConflictException('There is already an accout with this email');
    }

    // Todo
    // const { expiresAt, token } = this.generateVerificationToken();

    const newUser = new this.userModel({
      ...userDTO,
      // verificationToken: token,
      // verificationExpiresAt: expiresAt,
    });

    // TODO
    // send a verificatio email

    return await newUser.save();
  }

  generateVerificationToken() {
    return {
      token: crypto.randomBytes(32).toString('hex'),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    };
  }

  // Todo
  async publishVerificationEmail() {
    return null;
  }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec();
  // }
}
