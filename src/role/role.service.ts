import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { GetRoleDto } from './dto/getRole.dto';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async getRoles(filter: GetRoleDto): Promise<Role[]> {
    return await this.roleRepository.find({
      where: filter,
    });
  }

  async getRoleByUuid(uuid: string): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { uuid },
    });
  }

  async getRoleByName(name: string): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { name },
    });
  }

  async createRole(role: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(role);
  }

  async updateRole(filter: GetRoleDto, role: CreateRoleDto): Promise<Role[]> {
    await this.roleRepository.update(filter, role);
    return await this.getRoles(filter);
  }

  async deleteRole(filter: GetRoleDto): Promise<Role[]> {
    return await this.roleRepository.remove(await this.getRoles(filter));
  }
}
