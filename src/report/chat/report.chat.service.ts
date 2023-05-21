import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportChat } from './report.chat.entity';
import { Repository } from 'typeorm';
import { CreateReportChatDto } from './dto/createReportChat.dto';
import { ReportChatFilterDto } from './dto/reportChat.filter.dto';

@Injectable()
export class ReportChatService {
  constructor(
    @InjectRepository(ReportChat)
    private reportChatRepository: Repository<ReportChat>,
  ) {}

  fillDefaultReportChatFilter(
    filter: ReportChatFilterDto,
  ): ReportChatFilterDto {
    return {
      ...filter,
      archived: filter.archived || false,
    };
  }

  async createReportChat(reportChat: CreateReportChatDto): Promise<ReportChat> {
    return await this.reportChatRepository.save(reportChat);
  }

  async getAllReportChats(): Promise<ReportChat[]> {
    return await this.reportChatRepository.find({
      relations: ['creator', 'chat'],
    });
  }

  async getReportChat(filter: ReportChatFilterDto): Promise<ReportChat[]> {
    return await this.reportChatRepository.find({
      where: filter,
      relations: ['creator', 'chat'],
    });
  }

  async updateReportChat(filter: ReportChatFilterDto, report: ReportChat) {
    filter = this.fillDefaultReportChatFilter(filter);

    const reports: ReportChat[] = await this.getReportChat(filter);
    reports.forEach((reportToUpdate) => {
      Object.assign(reportToUpdate, report);
    });
    return await this.reportChatRepository.save(reports);
  }

  async deleteReportChats(
    filter: ReportChatFilterDto,
    force: boolean,
  ): Promise<ReportChat[]> {
    const reportChats = await this.getReportChat(filter);

    if (force) {
      return await this.reportChatRepository.remove(reportChats);
    }
    return await this.updateReportChat(filter, {
      archived: true,
    } as ReportChat);
  }
}
