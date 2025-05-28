import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserTokensModule } from '@app/user-tokens';
import { EncryptionService } from '@app/encryption';

@Module({
  imports: [UserTokensModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, EncryptionService]
})
export class AuthModule {}
