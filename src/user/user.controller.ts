import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserFilterDto } from './dto/getUser.filter.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserQueryParamDto } from './dto/userQueryParam.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUser(
    @Body() filter: UserFilterDto,
    @Query('page') page: number,
    @Query('page_size') pageSize: number,
  ): Promise<any> {
    const queryParam: UserQueryParamDto = {
      paging: {
        page: page,
        pageSize: pageSize,
      },
    };

    const users: User[] = await this.userService.getUsers(filter, queryParam);

    return {
      data: users,
      paging: {
        page: queryParam.paging.page,
        pageSize: queryParam.paging.pageSize,
        fetched: users.length,
        total: await this.userService.countUsers(filter),
      },
    };
  }

  @Get('/:uuid')
  async getUserByUuid(@Param('uuid') uuid: string): Promise<User> {
    return await this.userService.getUserByUuid(uuid);
  }

  @Get('/name/:name')
  async getUserByName(@Param('name') name: string): Promise<User> {
    return await this.userService.getUserByName(name);
  }

  @Post('/')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Put('/')
  async updateUser(@Body() body: UpdateUserDto): Promise<User[]> {
    const filter: UserFilterDto = body.filter;
    const user: User = body.user;

    return await this.userService.updateUser(filter, user);
  }

  @Delete('/')
  async deleteUser(
    @Body() filter: UserFilterDto,
    @Query('force') forced: boolean,
  ): Promise<User[]> {
    return await this.userService.deleteUser(filter, forced);
  }
}
