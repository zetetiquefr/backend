import { Chat } from '../chat/chat.entity';
import { User } from '../user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ChatHistory {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  archived: boolean;

  @ManyToOne(() => Chat, (chat) => chat.chatHistory)
  chat: Chat;

  @ManyToOne(() => User, (user) => user.chatHistory)
  creator: User;
}
