import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_characteristics')
export class ProductCharacteristicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 50, nullable: false })
  name: string;

  @Column({ name: 'product_id' })
  productId: string;
}
