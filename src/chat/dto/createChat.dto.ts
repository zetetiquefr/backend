import { IsString } from 'class-validator';
import { Forum } from 'src/forum/forum.entity';
import { User } from 'src/user/user.entity';

export class CreateChatDto {
  @IsString()
  content: string;
  creator: User;
  forum: Forum;
}
