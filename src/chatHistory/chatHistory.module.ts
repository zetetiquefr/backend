import { Module } from '@nestjs/common';
import { ChatHistoryController } from './chatHistory.controller';
import { ChatHistoryService } from './chatHistory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatHistory } from './chatHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatHistory])],
  controllers: [ChatHistoryController],
  providers: [ChatHistoryService],
  exports: [ChatHistoryService],
})
export class ChatHistoryModule {}
