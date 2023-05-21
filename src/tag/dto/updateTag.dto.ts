import { TagFilterDto } from './tagFilter.dto';
import { Tag } from '../tag.entity';

export class UpdateTagDto {
  filter: TagFilterDto;
  tag: Tag;
}
