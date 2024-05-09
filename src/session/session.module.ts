import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from '../auth/entities/result.entity';
import { SessionMember } from './entities/session_member.entity';
import { Session } from './entities/session.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, SessionMember, Session, User])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
