import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SnippetsService } from './snippets.service';
import { Snippet } from './snippet.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('snippets')
@Controller('snippets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new snippet' })
  @ApiResponse({ status: 201, description: 'The snippet has been successfully created.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createSnippetDto: Partial<Snippet>, @Request() req) {
    return this.snippetsService.create(createSnippetDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all snippets' })
  @ApiResponse({ status: 200, description: 'Return all snippets.'})
  findAll() {
    return this.snippetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get particular snippets' })
  @ApiResponse({ status: 200, description: 'Return specific snippets.'})
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific snippet' })
  @ApiResponse({ status: 200, description: 'updated the specific snippet'})
  update(@Param('id') id: string, @Body() updateSnippetDto: Partial<Snippet>) {
    return this.snippetsService.update(+id, updateSnippetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete particular snippets' })
  @ApiResponse({ status: 200, description: 'Delete particular snippet.'})
  remove(@Param('id') id: string) {
    return this.snippetsService.remove(+id);
  }
}