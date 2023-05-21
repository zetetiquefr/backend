import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportForum } from './report.forum.entity';
import { Repository } from 'typeorm';
import { CreateReportForumDto } from './dto/createReportForum.dto';
import { ReportForumFilterDto } from './dto/reportForum.filter.dto';

@Injectable()
export class ReportForumService {
  constructor(
    @InjectRepository(ReportForum)
    private reportForumRepository: Repository<ReportForum>,
  ) {}

  fillDefaultReportForumFilter(
    filter: ReportForumFilterDto,
  ): ReportForumFilterDto {
    return {
      ...filter,
      archived: filter.archived || false,
    };
  }

  async createReportForum(report: CreateReportForumDto): Promise<ReportForum> {
    return await this.reportForumRepository.save(report);
  }

  async getAllReportForums(): Promise<ReportForum[]> {
    return await this.reportForumRepository.find({
      relations: ['forum', 'creator'],
    });
  }

  async getReportForum(filter: ReportForumFilterDto): Promise<ReportForum[]> {
    filter = this.fillDefaultReportForumFilter(filter);

    return await this.reportForumRepository.find({
      where: filter,
      relations: ['forum', 'creator'],
    });
  }

  async updateReportForum(
    filter: ReportForumFilterDto,
    report: ReportForum,
  ): Promise<ReportForum[]> {
    filter = this.fillDefaultReportForumFilter(filter);

    const reports: ReportForum[] = await this.getReportForum(filter);
    reports.forEach((reportToUpdate) => {
      Object.assign(reportToUpdate, report);
    });
    return await this.reportForumRepository.save(reports);
  }
  async deleteReportForum(
    report: ReportForumFilterDto,
    force: boolean,
  ): Promise<ReportForum[]> {
    const reports = await this.reportForumRepository.find({
      where: report,
    });

    if (force) {
      return await this.reportForumRepository.remove(reports);
    }
    return await this.updateReportForum(report, {
      archived: true,
    } as ReportForum);
  }
}
