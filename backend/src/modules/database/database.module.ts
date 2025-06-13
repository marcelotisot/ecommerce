import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../../config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.dbHost,
      port: environment.dbPort,
      username: environment.dbUsername,
      password: environment.dbPassword,
      database: environment.dbName,
      autoLoadEntities: true,
      synchronize: true,  // No usar en producción
    }),
  ]
})
export class DatabaseModule {}
