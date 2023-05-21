import { Injectable } from '@nestjs/common';
import { Forum } from './forum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForumFilterDto } from './dto/forumFilter.dto';
import { CreateForumDto } from './dto/createForum.dto';
import { ForumQueryParamDto } from './dto/forumQueryParam.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>,
  ) {}

  async getAllForums(): Promise<Forum[]> {
    return await this.forumRepository.find({
      relations: ['creator', 'chats', 'tags'],
    });
  }

  async getForums(
    filter: ForumFilterDto,
    queryParam: ForumQueryParamDto = {} as ForumQueryParamDto,
  ): Promise<Forum[]> {
    queryParam.paging = {
      page: queryParam.paging.page || 1,
      pageSize: queryParam.paging.pageSize || 10,
    };

    return await this.forumRepository.find({
      where: filter,
      relations: ['creator', 'chats', 'tags'],
      take: queryParam.paging.pageSize,
      skip: (queryParam.paging.page - 1) * queryParam.paging.pageSize,
    });
  }

  async getForumByUuid(uuid: string): Promise<Forum> {
    return await this.forumRepository.findOne({
      where: { uuid },
      relations: ['creator', 'chats', 'tags'],
      order: {
        chats: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async getForumByName(name: string): Promise<Forum> {
    return await this.forumRepository.findOne({
      where: { name },
      relations: ['creator', 'chats', 'tags'],
    });
  }

  async createForum(forum: CreateForumDto): Promise<Forum> {
    return await this.forumRepository.save(forum);
  }

  async updateForum(
    filter: ForumFilterDto,
    forum: CreateForumDto,
  ): Promise<Forum[]> {
    const forums: Forum[] = await this.getForums(filter);

    await this.forumRepository.update(filter, forum);
    return forums;
  }

  async deleteForum(filter: ForumFilterDto): Promise<Forum[]> {
    return await this.forumRepository.remove(await this.getForums(filter));
  }

  async countForums(filter: ForumFilterDto): Promise<number> {
    return await this.forumRepository.count({
      where: filter,
    });
  }
}
