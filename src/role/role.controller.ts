import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { GetRoleDto } from './dto/getRole.dto';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

@Controller('role')
export class RoleController {
  constructor(
    @Inject(RoleService) private readonly rolesService: RoleService,
  ) {}

  @Get('/')
  async getRoles(@Body() filter: GetRoleDto): Promise<Role[]> {
    return await this.rolesService.getRoles(filter);
  }

  @Get('/:uuid')
  async getRoleByUuid(@Param('uuid') uuid: string): Promise<Role> {
    return await this.rolesService.getRoleByUuid(uuid);
  }

  @Get('/name/:name')
  async getRoleByName(@Param('name') name: string): Promise<Role> {
    return await this.rolesService.getRoleByName(name);
  }

  @Post('/')
  async createRole(@Body() role: CreateRoleDto): Promise<Role> {
    return await this.rolesService.createRole(role);
  }

  @Put('/')
  async updateRole(@Body() role: UpdateRoleDto): Promise<Role[]> {
    const filter: GetRoleDto = role.filter;
    const roleToUpdate: CreateRoleDto = role.role;

    return await this.rolesService.updateRole(filter, roleToUpdate);
  }

  @Delete('/')
  async deleteRole(@Body() filter: GetRoleDto): Promise<Role[]> {
    return await this.rolesService.deleteRole(filter);
  }
}
