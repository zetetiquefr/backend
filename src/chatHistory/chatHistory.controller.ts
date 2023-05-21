import { Controller } from '@nestjs/common';
import { ChatHistoryService } from './chatHistory.service';

@Controller('history/chat')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}
}
