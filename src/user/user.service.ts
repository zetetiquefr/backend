import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserFilterDto } from './dto/getUser.filter.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { createHash } from 'crypto';
import { UserQueryParamDto } from './dto/userQueryParam.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  encryptPassword(user: User): User {
    if (user.password) {
      user.password = createHash('sha256').update(user.password).digest('hex');
    }
    return user;
  }

  comparePassword(password: string, user: User): boolean {
    const tryLogUser: User = this.encryptPassword({
      password: password,
    } as User);

    return user.password === tryLogUser.password;
  }

  fillDefaultQueryParams(queryParam: UserQueryParamDto): UserQueryParamDto {
    return {
      ...queryParam,
      paging: {
        page: queryParam.paging.page || 1,
        pageSize: queryParam.paging.pageSize || 10,
      },
    };
  }

  fillDefaultUserFilter(filter: UserFilterDto): UserFilterDto {
    return {
      ...filter,
      archived: filter.archived || false,
    };
  }

  async getAllUsers(queryParam: UserQueryParamDto): Promise<User[]> {
    queryParam = this.fillDefaultQueryParams(queryParam);

    return await this.userRepository.find({
      relations: ['roles'],
      skip: (queryParam.paging.page - 1) * queryParam.paging.pageSize,
      take: queryParam.paging.pageSize,
    });
  }

  async countUsers(filter: UserFilterDto): Promise<number> {
    return await this.userRepository.count({
      where: filter,
    });
  }

  async getUserByUuid(uuid: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        uuid: uuid,
      },
      relations: ['roles'],
    });
  }

  async getUserByName(name: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        name: name,
      },
      relations: ['roles'],
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: ['roles'],
    });
  }

  async getUsers(
    filter: UserFilterDto,
    queryParam: UserQueryParamDto = undefined,
  ): Promise<User[]> {
    filter = this.fillDefaultUserFilter(filter);

    if (queryParam === undefined) {
      return await this.userRepository.find({
        where: filter,
        relations: ['roles'],
      });
    }
    queryParam = this.fillDefaultQueryParams(queryParam);

    return await this.userRepository.find({
      where: filter,
      relations: ['roles'],
      skip: (queryParam.paging.page - 1) * queryParam.paging.pageSize,
      take: queryParam.paging.pageSize,
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    user = this.encryptPassword(user as User);
    return await this.userRepository.save(user);
  }

  async updateUser(filter: UserFilterDto, user: User): Promise<User[]> {
    filter = this.fillDefaultUserFilter(filter);
    user = this.encryptPassword(user);

    const users: User[] = await this.getUsers(filter);
    users.forEach((userToUpdate) => {
      Object.assign(userToUpdate, user);
    });
    return await this.userRepository.save(users);
  }

  async deleteUser(filter: UserFilterDto, forced = false): Promise<User[]> {
    if (forced) {
      return await this.userRepository.remove(await this.getUsers(filter));
    }
    return await this.updateUser(filter, {
      archived: true,
    } as User);
  }
}
