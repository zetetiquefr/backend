import { Module } from '@nestjs/common';
import { ReportForumController } from './report.forum.controller';
import { ReportForumService } from './report.forum.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportForum } from './report.forum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportForum])],
  controllers: [ReportForumController],
  providers: [ReportForumService],
  exports: [ReportForumService],
})
export class ReportForumModule {}
