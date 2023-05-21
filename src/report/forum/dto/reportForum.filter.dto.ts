import { IsOptional, IsUUID } from 'class-validator';

export class ReportForumFilterDto {
  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  archived: boolean;
}
