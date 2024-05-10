import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, name: 'line_1' })
  line1: string;

  @Column({ length: 255, name: 'line_2', nullable: true })
  line2: string;

  @Column({ length: 50, name: 'zip_code' })
  zipCode: string;

  @Column({ length: 255, name: 'city' })
  city: string;

  @Column({ length: 255, name: 'country' })
  country: string;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => Company)
  company: Company;

  @OneToMany(() => Company, (company) => company.address)
  companies: Company[];

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
