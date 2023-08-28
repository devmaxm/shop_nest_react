import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";

import {Review, Rating} from "../reviews/reviews.entity";
import {RolesEnum} from "../roles/roles.enum";
import {Order} from "../orders/orders.entity";
import {Product} from "../products/products.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    fullName: string

    @Column()
    password: string

    @Column({type: "enum", enum: RolesEnum, default: RolesEnum.User})
    role: RolesEnum

    @Column({default: false})
    isConfirmed: boolean

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

    @ManyToMany(() => Product)
    @JoinTable()
    favorite: Product[]
}
