import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ReportForumService } from './report.forum.service';
import { CreateReportForumDto } from './dto/createReportForum.dto';
import { ReportForum } from './report.forum.entity';
import { ReportForumFilterDto } from './dto/reportForum.filter.dto';

@Controller('/report/forum')
export class ReportForumController {
  constructor(private readonly reportForumService: ReportForumService) {}

  @Post('/')
  async createReportForum(
    @Body() report: CreateReportForumDto,
  ): Promise<ReportForum> {
    return await this.reportForumService.createReportForum(report);
  }

  @Get('/')
  async getReportForums(): Promise<ReportForum[]> {
    return await this.reportForumService.getAllReportForums();
  }

  @Delete('/')
  async deleteAllReportForums(
    @Body() filter: ReportForumFilterDto,
    @Query('force') force: boolean,
  ): Promise<ReportForum[]> {
    force = force ?? false;

    return await this.reportForumService.deleteReportForum(filter, force);
  }
}
