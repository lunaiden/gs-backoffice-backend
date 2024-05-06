import { IsEmail, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @MinLength(4)
  readonly email: string;
}
