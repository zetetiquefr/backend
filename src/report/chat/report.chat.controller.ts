import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ReportChatService } from './report.chat.service';
import { ReportChat } from './report.chat.entity';
import { CreateReportChatDto } from './dto/createReportChat.dto';
import { ReportChatFilterDto } from './dto/reportChat.filter.dto';

@Controller('report/chat')
export class ReportChatController {
  constructor(private readonly reportChatService: ReportChatService) {}

  @Get('/')
  async getReportChats(): Promise<ReportChat[]> {
    return await this.reportChatService.getAllReportChats();
  }

  @Post('/')
  async createReportChat(
    @Body() report: CreateReportChatDto,
  ): Promise<ReportChat> {
    return await this.reportChatService.createReportChat(report);
  }

  @Delete('/')
  async deleteAllReportChats(
    @Body() filter: ReportChatFilterDto,
    @Query('force') force: boolean,
  ): Promise<ReportChat[]> {
    force = force ?? false;

    return await this.reportChatService.deleteReportChats(filter, force);
  }
}
