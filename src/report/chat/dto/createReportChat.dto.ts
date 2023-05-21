import { Chat } from 'src/chat/chat.entity';
import { User } from 'src/user/user.entity';

export class CreateReportChatDto {
  content: string;
  creator: User;
  chat: Chat;
}
