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
import { ForumService } from './forum.service';
import { ForumFilterDto } from './dto/forumFilter.dto';
import { Forum } from './forum.entity';
import { CreateForumDto } from './dto/createForum.dto';
import { UpdateForumDto } from './dto/updateForum.dto';
import { ForumQueryParamDto } from './dto/forumQueryParam.dto';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('/')
  async getAllForums(
    @Body() filter: ForumFilterDto,
    @Query('page') page: number,
    @Query('page_size') pageSize: number,
  ): Promise<any> {
    const queryParam: ForumQueryParamDto = {
      paging: {
        page: page,
        pageSize: pageSize,
      },
    };

    const res: Forum[] = await this.forumService.getForums(filter, queryParam);

    return {
      data: res,
      paging: {
        page: page,
        pageSize: pageSize,
        fetched: res.length,
        total: await this.forumService.countForums(filter),
      },
    };
  }

  @Get('/:uuid')
  async getForumByUuid(@Param('uuid') uuid: string): Promise<Forum> {
    return await this.forumService.getForumByUuid(uuid);
  }

  @Get('/name/:name')
  async getForumByName(@Param('name') name: string): Promise<Forum> {
    return await this.forumService.getForumByName(name);
  }

  @Post('/')
  async createForum(@Body() forum: CreateForumDto): Promise<Forum> {
    return await this.forumService.createForum(forum);
  }

  @Put('/')
  async updateForum(@Body() forum: UpdateForumDto): Promise<Forum[]> {
    return await this.forumService.updateForum(forum.filter, forum.forum);
  }

  @Delete('/')
  async deleteForum(@Body() filter: ForumFilterDto): Promise<Forum[]> {
    return await this.forumService.deleteForum(filter);
  }
}
