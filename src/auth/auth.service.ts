import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MailerService } from '../mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './entities/user.entity';

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
      const access_token = await this.jwtService.sign(payload);

      user.lastLogin = new Date();

      await this.userRepository.save(user);

      console.log('dans le main ', process.env.POSTGRES_DATABASE);

      return { access_token, user };
    } else {
      throw new UnauthorizedException('Identifiants incorrects.');
    }
  }

  async sendEmailForgotPassword(forgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      await this.emailService
        .sendResetPasswordLink(email, 'token')
        .catch((err) => {
          return new Error(err.message);
        });
    }

    return 'email sent';
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
