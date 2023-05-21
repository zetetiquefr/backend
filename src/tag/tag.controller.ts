import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/createTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAllTags(): Promise<Tag[]> {
    return await this.tagService.getAllTags();
  }

  @Get('/:uuid')
  async getTagByUuid(@Param('uuid') uuid: string): Promise<Tag> {
    return await this.tagService.getTagByUuid(uuid);
  }

  @Get('/name/:name')
  async getTagByName(@Param('name') name: string): Promise<Tag> {
    return await this.tagService.getTagByName(name);
  }

  @Post()
  async createTag(@Body() tag: CreateTagDto): Promise<Tag> {
    return await this.tagService.createTag(tag);
  }

  @Put()
  async updateTag(@Body() tag: UpdateTagDto): Promise<Tag[]> {
    return await this.tagService.updateTag(tag.filter, tag.tag);
  }

  @Delete()
  async deleteTag(@Body() tag: UpdateTagDto): Promise<Tag[]> {
    return await this.tagService.deleteTag(tag.filter);
  }
}
