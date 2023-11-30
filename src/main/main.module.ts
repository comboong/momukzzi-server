import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/shop/entities/shop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shop
    ])
  ],
  controllers: [MainController],
  providers: [MainService]
})
export class MainModule {}
