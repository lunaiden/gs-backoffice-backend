import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
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
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Session, (session) => session.users)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'presentation_file' })
  presentationFile: File;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
