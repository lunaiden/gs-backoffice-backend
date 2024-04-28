import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Session } from '../../session/entities/session.entity';
import { File } from '../../file/entities/file.entity';

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.results)
  user: User;

  @ManyToOne(() => Session, (session) => session.results)
  session: Session;

  @OneToOne(() => File)
  @JoinColumn()
  file: File;
}
