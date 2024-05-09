import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository as MyUserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { Role } from './entities/role.entity';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { Role as RoleEnum } from './roles-enum';
import { Address } from '../address/entities/address.entity';
import { File } from '../file/entities/file.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Role, Address, File]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 86400,
      },
    }),
  ],
  providers: [AuthService, MyUserRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {
  constructor(private readonly userRepository: MyUserRepository) {}

  async onModuleInit() {
    this.userRepository.createRoleIfDontExist('superadmin');
    this.userRepository.createRoleIfDontExist('admin');
    this.userRepository.createRoleIfDontExist('trainee');
    this.userRepository.createRoleIfDontExist('user');
    this.userRepository.createRoleIfDontExist('referent');

    this.userRepository.createUserIfDontExist({
      email: 'gs-admin@yopmail.com',
      password: '@Test123456',
      roleName: RoleEnum.SUPERADMIN,
    });

    this.userRepository.createUserIfDontExist({
      email: 'gs-user@yopmail.com',
      password: '@Test123456',
      roleName: RoleEnum.USER,
    });
  }
}
