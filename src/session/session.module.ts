import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from '../auth/entities/result.entity';
import { SessionMember } from './entities/session_member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, SessionMember])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
