import { IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  readonly token: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/, {
    message: 'Le mot de passe est trop faible',
  })
  readonly password: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/, {
    message: 'Le mot de passe est trop faible',
  })
  readonly confirmPassword: string;
}
