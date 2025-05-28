import { Injectable } from '@nestjs/common';
import { AccessTokenPayload } from './user-tokens.interface';
import { AccessTokenService } from './access-token/access-token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Injectable()
export class UserTokensService {

  constructor(
    private readonly atService: AccessTokenService,
    private readonly rtService: RefreshTokenService
  ) {}

  async generateUserTokens(payload:AccessTokenPayload){
    const accessToken = this.atService.generate(payload);
    const refreshToken = this.rtService.generate();

    return {
      accessToken,
      ...refreshToken
    };
  }
}
