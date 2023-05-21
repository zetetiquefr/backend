import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { Forum } from 'src/forum/forum.entity';
import { Chat } from 'src/chat/chat.entity';
import { ReportForum } from 'src/report/forum/report.forum.entity';
import { ReportChat } from 'src/report/chat/report.chat.entity';
import { ChatHistory } from 'src/chatHistory/chatHistory.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Forum, (forum) => forum.creator)
  @JoinTable()
  forums: Forum[];

  @OneToMany(() => Chat, (chat) => chat.creator)
  @JoinTable()
  chats: Chat[];

  @Column({
    default: false,
  })
  archived: boolean;

  @OneToMany(() => ReportForum, (reportForum) => reportForum.creator)
  @JoinTable()
  reportsForum: ReportForum[];

  @OneToMany(() => ReportChat, (reportChat) => reportChat.creator)
  reportsChat: ReportChat[];

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.creator)
  chatHistory: ChatHistory[];
}
