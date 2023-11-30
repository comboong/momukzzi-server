import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true})
  id: number;

  @Column({ type: 'varchar', length: 5 })
  category_group_code: string;

  @Column({ type: 'varchar', length: 10 })
  category_group_name: string;
  
  @Column({ type: 'varchar', length: 50})
  category_name: string;

  @Column({ type: 'int', unsigned: true, unique: true })
  place_id: number;

  @Column({ type: 'varchar', length: 30 })
  x: string;

  @Column({ type: 'varchar', length: 30 })
  y: string;

  @Column({ type: 'int' })
  distance: number;

  @Column({ type: 'varchar', length: 20 })
  place_name: string;

  @Column({ type: 'varchar', length: 50 })
  address_name: string;

  @Column({ type: 'varchar', length: 50 })
  road_address_name: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'text' })
  place_url: string;

  @Column({ type: 'json' })
  menu_list: JSON;

  @Column({ type: 'json' })
  menu_img: JSON;
}
