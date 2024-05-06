import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @MinLength(4)
  readonly email: string;

  @IsString()
  readonly password: string;
}
