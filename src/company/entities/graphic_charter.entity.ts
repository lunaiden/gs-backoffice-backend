import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity('graphic_charter')
export class GraphicCharter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'primary_color' })
  primaryColor: string;

  @Column({ name: 'secondary_color' })
  secondaryColor: string;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
