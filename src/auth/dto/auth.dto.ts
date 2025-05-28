import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email:string;

  @IsNotEmpty()
  @Length(8,20,{ message: "Password must be between 8 to 20 characters." })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message: "Password must contains numbers, upper and lower letters." })
  password:string;

  @IsNotEmpty()
  firstname:string;

  @IsNotEmpty()
  lastname:string;
}

export class LoginDto {
  @IsEmail()
  email:string;

  @IsNotEmpty()
  password:string;
}

export class RefreshTokensDto {
  @IsNotEmpty()
  refreshToken:string;
}