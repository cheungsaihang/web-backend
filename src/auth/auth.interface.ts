import { AccessTokenDecodedPayload } from "@app/user-tokens/user-tokens.interface";
import { RefreshTokensDto } from "./dto/auth.dto";

export interface RequestUser extends AccessTokenDecodedPayload {
  accessToken:string;
}

export interface RequestRefreshToken {
  params:RefreshTokensDto;
  user:RequestUser;
}