import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'rudradev',
  database: 'snippet',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, //make it false dumbo
};