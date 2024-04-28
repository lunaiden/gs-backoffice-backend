import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalFileName: string;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;
}
