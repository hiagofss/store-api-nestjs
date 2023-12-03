import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCharacteristicEntity } from './product-characteristic.entity';
import { ProductImageEntity } from './product-image.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'description', length: 255 })
  description: string;

  @Column({ name: 'price', type: 'decimal' })
  price: number;

  @Column({ name: 'stock', type: 'integer' })
  stock: number;

  @Column({ length: 50 })
  category: string;

  @OneToMany(
    () => ProductCharacteristicEntity,
    (characteristic) => characteristic.product,
  )
  characteristics: ProductCharacteristicEntity[];

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images: ProductImageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
