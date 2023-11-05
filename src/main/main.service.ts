import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';

@Injectable()
export class MainService {
  create(createMainDto: CreateMainDto) {
    return 'This action adds a new main';
  }

  async findAll(longitude: string, latitude: string) {
    const res = await axios.get(`https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=1&size=15&sort=accuracy&x=${longitude}&y=${latitude}&radius=1000`,
      {
        headers: {
          Authorization: process.env.KAKAO_AUTHORIZATION_KEY
        }
      }
    );
    console.log(res.data.documents);
    
    // const res_ = await axios.post(`${process.env.CRAWLING_SERVER_URL}:3000/crawling`, res.data.documents.slice(0, 2));
    // console.log(res_);
    // return res_.data;
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
