import { CreateRoleDto } from './createRole.dto';
import { GetRoleDto } from './getRole.dto';

export class UpdateRoleDto {
  filter: GetRoleDto;
  role: CreateRoleDto;
}
