import { IsOptional } from 'class-validator';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';

export class CreateForumDto {
  name: string;
  description: string;
  creator: User;

  @IsOptional()
  tags: Tag[];
}
