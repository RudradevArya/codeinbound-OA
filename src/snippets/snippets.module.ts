import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { Snippet } from './snippet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snippet])],
  providers: [SnippetsService],
  controllers: [SnippetsController],
})
export class SnippetsModule {}