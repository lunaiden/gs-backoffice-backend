import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column()
  password: string;

  @Column({ length: 50, name: 'last_name', nullable: true })
  lastName: string;

  @Column({ length: 50, name: 'first_name', nullable: true })
  firstName: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ type: 'timestamptz', name: 'last_login', nullable: true })
  lastLogin: Date;

  @ManyToOne(() => Role, { nullable: true, eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn({ name: 'address_id' })
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
