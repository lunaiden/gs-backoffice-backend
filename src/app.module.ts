import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
// import { dataSourceOptions } from '../db/data-source';
import { FileModule } from './file/file.module';
import { AddressModule } from './address/address.module';
import { CompanyModule } from './company/company.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    FileModule,
    AddressModule,
    CompanyModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
