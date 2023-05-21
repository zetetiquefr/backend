import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Forum } from 'src/forum/forum.entity';
import { ReportChat } from 'src/report/chat/report.chat.entity';
import { ChatHistory } from 'src/chatHistory/chatHistory.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'text',
  })
  content: string;

  @ManyToOne(() => User, (user) => user.chats)
  @JoinTable()
  creator: User;

  @ManyToOne(() => Forum, (forum) => forum.chats)
  @JoinTable()
  forum: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Update automatically at every update
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ default: false })
  archived: boolean;

  @OneToMany(() => ReportChat, (reportChat) => reportChat.chat)
  reports: ReportChat[];

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.chat, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  chatHistory: ChatHistory[];
}
