import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { AuthModule } from '../auth/auth.module';
import { AddressModule } from '../address/address.module';
// import { CompanyRepository } from './company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Address } from '../address/entities/address.entity';
import { File } from '../file/entities/file.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [
    AuthModule,
    AddressModule,
    TypeOrmModule.forFeature([Company, Address, File, User]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
