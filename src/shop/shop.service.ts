import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exception/service.exception';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async findOne(id: number): Promise<Shop> {
    const shop = await this.shopRepository.findOneBy({ id });

    if (!shop) {
      throw EntityNotFoundException(`${id} is not found`);
    }

    return shop;
  }
}
