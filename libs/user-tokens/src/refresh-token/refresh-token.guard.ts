
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenDecodedPayload } from '../user-tokens.interface';

type User = false | AccessTokenDecodedPayload;

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt') {
  handleRequest<TUser = unknown>(err: unknown, user: User, info: unknown, context: ExecutionContext, status?: unknown): TUser {
    if (info instanceof Error){
      throw new UnauthorizedException('access_token_is_invalid');
    }
    return super.handleRequest(err, user, info, context, status);
  }
}