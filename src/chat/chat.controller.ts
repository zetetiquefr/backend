import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { ChatFilterDto } from './dto/chatFilter.dto';
import { UpdateChatDto } from './dto/updateChat.dto';
import { CreateChatDto } from './dto/createChat.dto';
import { EditChatDto } from './dto/editChat.dto';
import { User } from 'src/user/user.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllChats(
    @Query('all') all_string: string,
    @Body() filter: ChatFilterDto,
  ): Promise<Chat[]> {
    const all: boolean = all_string === 'true';

    if (all === true) {
      return await this.chatService.getAllChats();
    }
    return await this.chatService.getChats(filter);
  }

  @Get('/:uuid')
  async getChatByUuid(@Param('uuid') uuid: string): Promise<Chat> {
    return await this.chatService.getChatByUuid(uuid);
  }

  @Post()
  async createChat(@Body() chat: CreateChatDto): Promise<Chat> {
    return await this.chatService.createChat(chat);
  }

  @Put()
  async updateChat(@Body() body: UpdateChatDto): Promise<Chat[]> {
    return await this.chatService.updateChat(body.filter, body.chat);
  }

  @Delete()
  async deleteChat(
    @Req() req: Request,
    @Body() filter: ChatFilterDto,
    @Query('force') force: boolean,
  ): Promise<Chat[]> {
    const user: User = req['user'];
    const chat: Chat = (await this.chatService.getChats(filter))[0];

    force = force ?? false;
    if (chat.creator.uuid !== user.uuid) {
      throw new Error('You are not the creator of this chat');
    }
    return await this.chatService.deleteChat(filter, force);
  }

  @Post('/edit')
  async editChat(
    @Req() req: Request,
    @Body() body: EditChatDto,
  ): Promise<Chat> {
    const user: User = req['user'];
    const chat = await this.chatService.getChatByUuid(body.uuid);

    if (chat.creator.uuid !== user.uuid) {
      throw new Error('You are not the creator of this chat');
    }
    return await this.chatService.editChat(body.uuid, body.content);
  }
}
