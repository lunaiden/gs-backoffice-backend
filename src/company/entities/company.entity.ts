import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { User } from '../../auth/entities/user.entity';
import { File } from '../../file/entities/file.entity';

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

  @Column({ name: 'no_tva', nullable: true })
  noTva: string;

  @Column({ name: 'isAutonomous', default: false })
  isAutonomous: boolean;

  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'logo' })
  logo: File;

  @OneToOne(() => Address, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToMany(() => User, (user) => user.companies)
  users: User[];

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
