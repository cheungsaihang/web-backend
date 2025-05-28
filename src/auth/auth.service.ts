import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserTokensService } from '@app/user-tokens';
import { RegisterDto } from './dto/auth.dto';
import { EncryptionService } from '@app/encryption';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private userTokensService: UserTokensService,
    private encryptionService: EncryptionService,
  ) {}

  async register(user:RegisterDto){
    const userExisted = await this.findUser(user.email);
    if(userExisted){
      throw new UnauthorizedException('user_is_existed');
    }
    try{
      const hash = await this.encryptionService.hash(user.password);
      await this.prisma.users.create({
        data:{
          email:user.email,
          firstname:user.firstname,
          lastname:user.lastname,
          password:hash
        }
      });
    }
    catch(err){
      console.log("Register Error",err);
      throw new InternalServerErrorException('cannot_create_user')
    }
  }

  async validateUser(email:string, password:string){
    const user = await this.findUser(email);
    if(!user){
      throw new UnauthorizedException("user_not_found");
    }
    if(!(await this.encryptionService.compare(password, user.password))){
      throw new UnauthorizedException("password_not_match");
    }
    return user;
  }

  async login(user:Users){
    const tokens = await this.userTokensService.generateUserTokens({userId:user.id, email:user.email.charAt(0)});
    try{
      await this.prisma.refreshTokens.create({
        data:{
          userId:user.id,
          accessToken:tokens.accessToken,
          refreshToken:tokens.refreshToken,
          expiresAt:tokens.refreshTokenExpire
        }
      });
    }
    catch(err){
      console.log("addUserTokens Error",err);
      throw new InternalServerErrorException('cannot_create_user_tokens')
    }
    return tokens;
  }

  async renewUserTokens(accessToken:string,refreshToken:string){
    const token = await this.validateRefreshToken({
      accessToken,
      refreshToken    
    });
    const user = await this.prisma.users.findUnique({
      where:{
        id:token.userId
      }
    });
    if(!user){
      throw new InternalServerErrorException("user_not_found");
    }
    return await this.login(user);
  }

  async deleteUserTokens(accessToken:string,refreshToken:string){
    const token = await this.validateRefreshToken({
      accessToken,
      refreshToken,
      ignoreExpiration:true
    });

    return await this.prisma.refreshTokens.delete({
      where:{
        id:token.id
      }
    });
  }

  private async findUser(email:string){
    return await this.prisma.users.findFirst({
      where: {
        email:email
      },
    });
  }

  private async validateRefreshToken({
    accessToken,
    refreshToken,
    ignoreExpiration
  }:{
    accessToken:string;
    refreshToken:string;
    ignoreExpiration?:boolean;
  }){
    const token = await this.prisma.refreshTokens.findFirst({
      where:{
        accessToken:accessToken,
        refreshToken:refreshToken
      }
    });
    if(!token){
      throw new BadRequestException("refresh_token_not_found");
    }
    if(!ignoreExpiration){
      if(Date.now() > token.expiresAt.getTime()){
        throw new BadRequestException("refresh_token_is_expired");
      }
    }
    return token;
  }
}
