import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';

export class ForumFilterDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  creator: User;

  @IsOptional()
  tags: Tag[];

  @IsOptional()
  archived: boolean;
}
