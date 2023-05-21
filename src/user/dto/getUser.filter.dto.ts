import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Role } from 'src/role/role.entity';

export class UserFilterDto {
  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString({ each: true })
  @IsOptional()
  roles: Role[];

  @IsOptional()
  @IsBoolean()
  archived: boolean;
}
