import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dummyuser',
  password: 'dummypass',
  database: 'code_snippet_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, //make it false dumbo
};