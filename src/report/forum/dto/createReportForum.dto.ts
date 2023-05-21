import { Forum } from 'src/forum/forum.entity';
import { User } from 'src/user/user.entity';

export class CreateReportForumDto {
  content: string;
  forum: Forum;
  creator: User;
}
