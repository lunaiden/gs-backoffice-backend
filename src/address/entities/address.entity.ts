import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, name: 'line_1' })
  line1: string;

  @Column({ length: 255, name: 'line_2' })
  line2: string;

  @Column({ length: 50, name: 'zip_code' })
  zipCode: string;

  @Column({ length: 255, name: 'city' })
  city: string;

  @Column({ length: 255, name: 'country' })
  country: string;
}
