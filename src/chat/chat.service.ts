import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';
import { ChatFilterDto } from './dto/chatFilter.dto';
import { CreateChatDto } from './dto/createChat.dto';
import { ChatHistoryService } from 'src/chatHistory/chatHistory.service';
import { ChatHistory } from 'src/chatHistory/chatHistory.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    private readonly chatHistoryService: ChatHistoryService,
  ) {}

  updateDefaultChatFilter(chatFilter: ChatFilterDto): ChatFilterDto {
    return {
      ...chatFilter,
      archived: chatFilter.archived ?? false,
    };
  }

  async getAllChats(): Promise<Chat[]> {
    return await this.chatRepository.find({
      relations: ['creator', 'forum', 'chatHistory'],
      order: {
        chatHistory: {
          createdAt: 'ASC',
        },
        createdAt: 'DESC',
      },
    });
  }

  async getChats(filter: ChatFilterDto): Promise<Chat[]> {
    filter = this.updateDefaultChatFilter(filter);

    return await this.chatRepository.find({
      where: filter,
      relations: ['creator', 'forum', 'chatHistory'],
      order: {
        chatHistory: {
          createdAt: 'ASC',
        },
        createdAt: 'DESC',
      },
    });
  }

  async getChatByUuid(uuid: string): Promise<Chat> {
    return await this.chatRepository.findOne({
      where: { uuid },
      relations: ['creator', 'forum', 'chatHistory'],
      order: {
        chatHistory: {
          createdAt: 'ASC',
        },
      },
    });
  }

  async createChat(chat: CreateChatDto): Promise<Chat> {
    return await this.chatRepository.save(chat);
  }

  async updateChat(filter: ChatFilterDto, chat: Chat): Promise<Chat[]> {
    filter = this.updateDefaultChatFilter(filter);

    const chats: Chat[] = await this.getChats(filter);

    await this.chatRepository.update(filter, chat);
    return chats;
  }

  async deleteChat(filter: ChatFilterDto, forced = false): Promise<Chat[]> {
    filter = this.updateDefaultChatFilter(filter);
    if (forced) {
      return await this.chatRepository.remove(await this.getChats(filter));
    }
    return await this.updateChat(filter, {
      archived: true,
    } as Chat);
  }

  async editChat(uuid: string, content: string): Promise<Chat> {
    const chat: Chat = await this.getChatByUuid(uuid);

    this.chatHistoryService.create({
      content: chat.content,
      chat: chat,
    } as ChatHistory);
    await this.updateChat(
      {
        uuid: uuid,
      } as ChatFilterDto,
      {
        content: content,
      } as Chat,
    );
    return await this.getChatByUuid(uuid);
  }
}
