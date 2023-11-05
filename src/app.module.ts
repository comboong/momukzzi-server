import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from './main/main.module';
import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/entities/*.entity.{js,ts}'],
      synchronize: true,
    }),
    MainModule,
    ShopModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
