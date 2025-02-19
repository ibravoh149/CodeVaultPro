import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SnippetModule } from '../snippet/snippet.module';

@Module({
  imports: [UserModule, SnippetModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
