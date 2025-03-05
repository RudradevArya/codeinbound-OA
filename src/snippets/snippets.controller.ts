import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SnippetsService } from './snippets.service';
import { Snippet } from './snippet.entity';

@Controller('snippets')
@UseGuards(JwtAuthGuard)
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() createSnippetDto: Partial<Snippet>, @Request() req) {
    return this.snippetsService.create(createSnippetDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.snippetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnippetDto: Partial<Snippet>) {
    return this.snippetsService.update(+id, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetsService.remove(+id);
  }
}