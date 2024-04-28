import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Session } from './session.entity';
import { File } from '../../file/entities/file.entity';

@Entity('session_member')
export class SessionMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_expert', default: false })
  isExpert: boolean;

  @Column({ nullable: true })
  speech: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @ManyToOne(() => Session, (session) => session.users)
  session: Session;

  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'presentation_file' })
  presentationFile: File;
}
