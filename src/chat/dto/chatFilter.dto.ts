import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Forum } from 'src/forum/forum.entity';
import { User } from 'src/user/user.entity';

export class ChatFilterDto {
  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  creator: User;

  @IsOptional()
  forum: Forum;

  @IsOptional()
  archived: boolean;
}
