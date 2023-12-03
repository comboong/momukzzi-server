import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Shop } from 'src/shop/entities/shop.entity';
import { In, Repository } from 'typeorm';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>
  ) {}

  getRandom(array: Shop[]) {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray.slice(0, 3);
  }

  async findAll(longitude: string, latitude: string) {
    const kakao_response = await axios.get(`https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=1&size=15&sort=accuracy&x=${longitude}&y=${latitude}&radius=1000`,
      {
        headers: {
          Authorization: process.env.KAKAO_AUTHORIZATION_KEY
        }
      }
    );

    const id_list = kakao_response.data.documents.map(el => parseInt(el.id));
    const exist_shops = await this.shopRepository.find({
      where: {
        place_id: In(id_list)
      },
    });

    const search_shops = kakao_response.data.documents.filter(el => !exist_shops.map(el => el.place_id).includes(parseInt(el.id)));
    
    if (exist_shops.length > 2) {
      return this.getRandom(exist_shops);
    } else {
      const result = [];
      const shops = await axios.post(`${process.env.CRAWLING_SERVER_URL}:3000/crawling`, search_shops.slice(0, 3));
      for (let shop of shops.data) {
        const created_shop = await this.shopRepository.save({
          category_group_code: shop.category_group_code,
          category_group_name: shop.category_group_name,
          category_name: shop.category_name,
          place_id: parseInt(shop.id),
          x: shop.x,
          y: shop.y,
          distance: parseInt(shop.distance),
          place_name: shop.place_name,
          address_name: shop.address_name,
          road_address_name: shop.road_address_name,
          phone: shop.phone,
          place_url: shop.place_url,
          menu_list: shop.menuInfo,
          menu_img: shop.menuImgUrl
        });
        result.push(created_shop);
      }
      return result;
    }
  }

  create(createMainDto: CreateMainDto) {
    return 'This action adds a new main';
  }

  findOne(id: number) {
    return `This action returns a #${id} main`;
  }

  update(id: number, updateMainDto: UpdateMainDto) {
    return `This action updates a #${id} main`;
  }

  remove(id: number) {
    return `This action removes a #${id} main`;
  }
}
