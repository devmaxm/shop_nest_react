import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    ManyToMany
} from "typeorm";
import {User} from "../users/users.entity";
import {Product} from "../products/products.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    email: string

    @Column()
    phoneNumber: string

    @Column()
    country: string

    @Column()
    city: string

    @Column()
    shippingAddress: string

    @Column({nullable: true})
    comment: string

    @Column()
    totalPrice: number

    @Column()
    totalDiscountPrice: number

    @Column({type: "boolean"})
    isPaid: boolean

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date

    @ManyToOne(() => User, (user) => user.orders, {nullable: true})
    user: User

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {onDelete: 'CASCADE'})
    products: OrderItem[]
}

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Order, (order) => order.products, {onDelete: "CASCADE"})
    @JoinColumn()
    order: Order

    @ManyToOne(() => Product, (product) => product.orders, {onDelete: "CASCADE"})
    @JoinColumn()
    product: Product

    @Column()
    price: number

    @Column()
    discountPrice: number

    @Column()
    quantity: number
}