import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MailerService } from '../mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { JwtPasswordPayload, JwtPayload } from './jwt-payload.interface';
import { User } from './entities/user.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { decrypt, encrypt } from '../utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.createUser(createUserDto);

    // send confirmation email
    await this.emailService
      .sendSignupConfirmation(createUserDto.email)
      .catch((err) => {
        return new Error(err.message);
      });

    return user;
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ access_token: string; user: User }> {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        userId: user.id,
        email: email,
        roleName: user.role.name,
      };
      const access_token = this.jwtService.sign(payload);

      user.lastLogin = new Date();

      await this.userRepository.save(user);

      return { access_token, user };
    } else {
      throw new UnauthorizedException('Identifiants incorrects.');
    }
  }

  async sendEmailForgotPassword(forgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      // generate jwt token
      const payload = {
        userId: user.id,
        email: email,
      };
      const reset_token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_PASSWORD_KEY,
        expiresIn: '1d',
      });

      // encrypt token
      const encryptedToken = encrypt(reset_token);

      // send email with token
      await this.emailService
        .sendResetPasswordLink(email, encryptedToken)
        .catch((err) => {
          return new Error(err.message);
        });
    }

    return 'email sent';
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, password, confirmPassword } = resetPasswordDto;
    // decrypt token
    const decryptedToken = decrypt(token).toString();

    // get payload
    let payload: JwtPasswordPayload;
    try {
      payload = this.jwtService.verify(decryptedToken, {
        secret: process.env.JWT_PASSWORD_KEY,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({ code: 'noToken' });
    }

    // recheck password
    if (password !== confirmPassword) {
      throw new InternalServerErrorException(
        'Les mots de passe doivent être identiques',
      );
    }

    // hash and store pwd
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.userRepository
        .update(
          { id: payload.userId, email: payload.email },
          { password: hashedPassword },
        )
        .then((data) => {
          if (data.affected === 0) {
            throw new InternalServerErrorException(
              'Une erreur est survenue pendant la mise à jour du mot de passe.',
            );
          }
        })
        .catch((err) => {
          return err;
        });
    } catch (err) {
      console.log(err);
    }

    // send confirmation mail
    await this.emailService
      .sendResetPasswordConfirmation(payload.email)
      .catch((err) => {
        return new Error(err.message);
      });

    return 'Mot de passe mis à jour';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
