import { Module } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenService } from './access-token/access-token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { AccessTokenGuard } from './access-token/access-token.guard';
import { RefreshTokenGuard } from './refresh-token/refresh-token.guard';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [JwtModule.register({ 
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions:{
      expiresIn:'2h'
    },
  })],
  providers: [UserTokensService, AccessTokenService, RefreshTokenService, AccessTokenGuard, RefreshTokenGuard, JwtStrategy, PrismaService],
  exports: [UserTokensService, AccessTokenGuard, RefreshTokenGuard],
})
export class UserTokensModule {}
