import { Body, Controller, Delete, Get, Post, Req, UseGuards} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AccessTokenGuard, RefreshTokenGuard } from '@app/user-tokens';
import { RequestRefreshToken } from './auth.interface';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async Register(@Body() body:RegisterDto){
    await this.authService.register(body);
    return {
      success:true
    }
  }

  @Post('login')
  async Login(@Body() login:LoginDto){
    const user = await this.authService.validateUser(login.email,login.password);
    const tokens = await this.authService.login(user);

    return {
      success:true,
      user:{
        id:user.id,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname
      },
      token:{
        accessToken:tokens.accessToken,
        refreshToken:tokens.refreshToken
      }
    };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refreshToken/:refreshToken')
  async refreshUserTokens(@Req() req:RequestRefreshToken){
    const { params, user } = req;
    const newTokens = await this.authService.renewUserTokens(user.accessToken,params.refreshToken);

    return {
      success:true,
      token:{
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken
      }
    }
  }

  @UseGuards(AccessTokenGuard)
  @Delete('refreshToken/:refreshToken')
  async clearUserTokens(@Req() req:RequestRefreshToken){
    const { params, user } = req;
    await this.authService.deleteUserTokens(user.accessToken, params.refreshToken);

    return {
      success:true,
    }
  }
}
