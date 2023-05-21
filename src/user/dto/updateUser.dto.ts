import { UserFilterDto } from './getUser.filter.dto';
import { User } from '../user.entity';

export class UpdateUserDto {
  filter: UserFilterDto;
  user: User;
}
