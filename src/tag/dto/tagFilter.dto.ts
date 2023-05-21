import { IsOptional, IsString, IsUUID } from 'class-validator';

export class TagFilterDto {
  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString()
  name: string;
}
