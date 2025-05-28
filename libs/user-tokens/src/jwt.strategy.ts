import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AccessTokenDecodedPayload } from './user-tokens.interface';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      ignoreExpiration: true,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AccessTokenDecodedPayload) {
    const accessToken = req.headers.authorization?.replace('Bearer ','');
    if(!accessToken){
      throw new UnauthorizedException("access_token_should_not_be_empty");
    }
    if(
      !(payload?.userId && payload?.email && payload?.createdAt) || 
      !(await this.prismaService.refreshTokens.findFirst({ where:{ accessToken:accessToken }}))
    ){
      throw new UnauthorizedException("access_token_is_invalid");
    }
    
    return {
      accessToken,
      ...payload
    };
  }
}
