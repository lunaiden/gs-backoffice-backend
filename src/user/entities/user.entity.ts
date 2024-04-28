import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { JoinColumn } from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { JoinTable } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Result } from './result.entity';
import { SessionMember } from '../../session/entities/session_member.entity';
import { File } from '../../file/entities/file.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 50, name: 'last_name' })
  lastName: string;

  @Column({ length: 50, name: 'first_name' })
  firstName: string;

  @Column()
  phone: number;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn()
  address: Address;

  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'profile_picture' })
  profilePicture: File;

  @ManyToMany(() => Company, (company) => company.users)
  @JoinTable({ name: 'company_member' })
  companies: Company[];

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];

  @OneToMany(() => SessionMember, (sessionMember) => sessionMember.user)
  sessions: SessionMember[];
}
