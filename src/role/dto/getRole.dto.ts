import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetRoleDto {
  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString()
  name: string;
}
