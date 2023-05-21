import { ForumFilterDto } from './forumFilter.dto';
import { Forum } from '../forum.entity';

export class UpdateForumDto {
  filter: ForumFilterDto;
  forum: Forum;
}
