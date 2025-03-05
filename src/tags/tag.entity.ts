import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Snippet } from '../snippets/snippet.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Snippet)
  snippets: Snippet[];
}