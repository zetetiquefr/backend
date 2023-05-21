import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Forum } from '../forum/forum.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ManyToMany(() => Forum, (forum) => forum.tags)
  @JoinTable()
  forums: Forum[];
}
