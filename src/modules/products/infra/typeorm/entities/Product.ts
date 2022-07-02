import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'products' })
class Product {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => OrdersProducts, (orderProducts) => orderProducts.product)
  orderProducts: OrdersProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Product };
