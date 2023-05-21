import { Module } from '@nestjs/common';
import { ReportChatController } from './report.chat.controller';
import { ReportChatService } from './report.chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportChat } from './report.chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportChat])],
  controllers: [ReportChatController],
  providers: [ReportChatService],
  exports: [ReportChatService],
})
export class ReportChatModule {}
