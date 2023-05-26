import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Chat } from '../chat/chat.entity';
import { Tag } from '../tag/tag.entity';
import { ReportForum } from '../report/forum/report.forum.entity';

@Entity()
export class Forum {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.forums, {
    nullable: false,
  })
  @JoinTable()
  creator: User;

  @OneToMany(() => Chat, (chat) => chat.forum)
  @JoinTable()
  chats: Chat[];

  @ManyToMany(() => Tag, (tag) => tag.forums)
  @JoinTable()
  tags: Tag[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: false })
  archived: boolean;

  @OneToMany(() => ReportForum, (report) => report.forum)
  @JoinTable()
  reports: ReportForum[];
}
