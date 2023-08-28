import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm";

import {RatingEnum} from "./review.enum";

import {User} from "../users/users.entity";
import {Product} from "../products/products.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    review: string

    @Column({type: "boolean", default: false})
    isModerated: boolean

    @Column()
    createdAt: string

    @Column()
    username: string

    @ManyToOne(() => Product, (product) => product.reviews, {onDelete: "CASCADE"})
    product: Product
}

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number

    @Column({enum: RatingEnum})
    rating: RatingEnum

//    product
    @ManyToOne(() => Product, (product) => product.rating, {onDelete: "CASCADE"})
    product: Product

//    user
    @Column()
    username: string
}