import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenPayload } from '../user-tokens.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenService {

  constructor(private readonly jwtService: JwtService) {}

  generate(payload:AccessTokenPayload){
    const createdAt = new Date(Date.now());
    return this.jwtService.sign({ ...payload, createdAt });
  }

  async decrypt(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken);
      return payload;
    } catch (error) {
      console.log("Access Token Decrypt Fail",error);
      throw new UnauthorizedException("access_token_is_invalid");
    }
  }
}
