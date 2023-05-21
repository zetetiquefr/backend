import { IsOptional, IsUUID } from 'class-validator';

export class ReportChatFilterDto {
  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  archived: boolean;
}
