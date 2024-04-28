import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Result } from '../../user/entities/result.entity';
import { SessionMember } from './session_member.entity';

@Entity('session')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @OneToMany(() => Result, (result) => result.session)
  results: Result[];

  @OneToMany(() => SessionMember, (sessionMember) => sessionMember.user)
  users: SessionMember[];
}
