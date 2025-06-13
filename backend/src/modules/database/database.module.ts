import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.dbHost,
      port: environment.dbPort,
      username: environment.dbUsername,
      password: environment.dbPassword,
      database: environment.dbName,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // No usar en producción
    }),
  ]
})
export class DatabaseModule {}
