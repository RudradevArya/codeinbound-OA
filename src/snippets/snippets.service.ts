import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snippet } from './snippet.entity';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(Snippet)
    private snippetsRepository: Repository<Snippet>,
  ) {}

  async create(snippetData: Partial<Snippet>, userId: number): Promise<Snippet> {
    const newSnippet = this.snippetsRepository.create({
      ...snippetData,
      user: { id: userId },
    });
    return this.snippetsRepository.save(newSnippet);
  }

  async findAll(): Promise<Snippet[]> {
    return this.snippetsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Snippet> {
    const snippet = await this.snippetsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!snippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return snippet;
  }

  async update(id: number, snippetData: Partial<Snippet>): Promise<Snippet> {
    await this.snippetsRepository.update(id, snippetData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.snippetsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
  }
}