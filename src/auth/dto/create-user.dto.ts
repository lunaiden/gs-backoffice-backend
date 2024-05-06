import { IsEmail, IsEnum, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '../roles-enum';

export class CreateUserDto {
  @IsEmail()
  @MinLength(4)
  readonly email: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Le mot de passe est trop faible',
  })
  readonly password: string;

  @IsEnum(Role)
  readonly roleName: Role;
}
