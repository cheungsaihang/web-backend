import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class RefreshTokenService {

  constructor() {}

  generate(){
    const refreshToken = uuidv4();
    const refreshTokenExpire = this.generateRefreshTokenExpire();

    return {
      refreshToken,
      refreshTokenExpire
    };
  }

  private generateRefreshTokenExpire():Date{
    //Expire time of Refresh Token is 7 days
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
}
