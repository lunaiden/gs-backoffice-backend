import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SessionMemberWordsDTO } from '../dto/session-member-words.dto';

@Entity('session_member_words')
export class SessionMemberWords {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  words: SessionMemberWordsDTO;
}
