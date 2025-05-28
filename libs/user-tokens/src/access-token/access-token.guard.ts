
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenDecodedPayload } from '../user-tokens.interface';

type User = false | AccessTokenDecodedPayload;

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  handleRequest<TUser = unknown>(err: unknown, user: User, info: unknown, context: ExecutionContext, status?: unknown): TUser {
    if (info instanceof Error){
      throw new UnauthorizedException('access_token_is_invalid');
    }
    if(user){
      const nowWithoutMs = Math.floor(Date.now() / 1000);
      if(nowWithoutMs > user.exp){
        throw new UnauthorizedException('access_token_is_expired');
      }
    }
    return super.handleRequest(err, user, info, context, status);
  }
}