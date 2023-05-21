import { Chat } from 'src/chat/chat.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum ReportChatStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity()
export class ReportChat {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.reportsChat)
  creator: User;

  @ManyToOne(() => Chat, (chat) => chat.reports)
  chat: Chat;

  @Column({
    default: false,
  })
  archived: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ReportChatStatus,
    default: ReportChatStatus.PENDING,
  })
  status: ReportChatStatus;
}
