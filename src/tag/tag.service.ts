import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { TagFilterDto } from './dto/tagFilter.dto';
import { CreateTagDto } from './dto/createTag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  async getTags(filter: TagFilterDto): Promise<Tag[]> {
    return await this.tagRepository.find({
      where: filter,
    });
  }

  async getTagByUuid(uuid: string): Promise<Tag> {
    return await this.tagRepository.findOne({
      where: { uuid },
    });
  }

  async getTagByName(name: string): Promise<Tag> {
    return await this.tagRepository.findOne({
      where: { name },
    });
  }

  async createTag(tag: CreateTagDto): Promise<Tag> {
    return await this.tagRepository.save(tag);
  }

  async updateTag(filter: TagFilterDto, tag: Tag): Promise<Tag[]> {
    const tags = await this.getTags(filter);

    await this.tagRepository.update(filter, tag);
    return tags;
  }

  async deleteTag(filter: TagFilterDto): Promise<Tag[]> {
    return await this.tagRepository.remove(await this.getTags(filter));
  }
}
