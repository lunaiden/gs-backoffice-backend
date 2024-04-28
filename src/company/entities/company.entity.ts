import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { User } from '../../user/entities/user.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  siren: string;

  @Column({ nullable: true })
  siret: string;

  @Column({ nullable: true })
  noTva: string;

  @Column({ default: false })
  isAutonomous: boolean;

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn()
  address: Address;

  @ManyToMany(() => User, (user) => user.companies)
  users: User[];
}
