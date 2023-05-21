import { ChatFilterDto } from './chatFilter.dto';
import { Chat } from '../chat.entity';

export class UpdateChatDto {
  filter: ChatFilterDto;
  chat: Chat;
}
