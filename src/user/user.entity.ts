import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Role } from "../role/role.entity";
import { Forum } from "../forum/forum.entity";
import { Chat } from "../chat/chat.entity";
import { ReportForum } from "../report/forum/report.forum.entity";
import { ReportChat } from "../report/chat/report.chat.entity";
import { ChatHistory } from "../chatHistory/chatHistory.entity";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;

    this.roles = [];
    this.forums = [];
    this.chats = [];
    this.reportsForum = [];
    this.reportsChat = [];
    this.chatHistory = [];
    this.archived = false;
    this.uuid = uuidv4();
  }

  @PrimaryGeneratedColumn("uuid")
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
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
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
