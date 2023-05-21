import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatHistory } from './chatHistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatHistoryService {
  constructor(
    @InjectRepository(ChatHistory)
    private chatHistoryRepository: Repository<ChatHistory>,
  ) {}

  async create(chat: ChatHistory): Promise<ChatHistory> {
    return await this.chatHistoryRepository.save(chat);
  }
}
