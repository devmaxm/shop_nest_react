import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinTable,
    Relation
} from "typeorm";

import {Review, Rating} from "../reviews/reviews.entity";
import {OrderItem} from "../orders/orders.entity";
import {User} from "../users/users.entity";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    code: string

    @Column()
    priceUAN: number

    @Column({nullable: true})
    priceUSD: number

    @Column({type: 'int', default: 0})
    sale: number

    @Column()
    availableQuantity: number

    @Column({default: true})
    isAvailable: boolean

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAd: Date

    @Column()
    photo: string

    @Column({unique: true})
    slug: string

//    properties
    @OneToMany(() => Property, (property) => property.product, {onDelete: "CASCADE"})
    properties: Property[]

//    brand
    @ManyToOne(() => Brand, (brand) => brand.products, {onDelete: "CASCADE"})
    brand: Relation<Brand>

//    model
    @ManyToOne(() => Model, (model) => model.products, {onDelete: "CASCADE"})
    model: Relation<Model>

//    category
    @ManyToOne(() => Category, (category) => category.products, {onDelete: "CASCADE"})
    category: Relation<Category>

//    photos
    @OneToMany(() => ProductPhoto, (photo) => photo.product, {onDelete: "CASCADE"})
    photos: ProductPhoto[]

//    reviews
    @OneToMany(() => Review, (review) => review.product, {onDelete: "CASCADE"})
    reviews: Review[]

//    rating
    @OneToMany(() => Rating, (rating) => rating.product, {onDelete: "CASCADE"})
    rating: Rating[]

//    orders
    @OneToMany(() => OrderItem, (orderItem) => orderItem.product, {onDelete: "CASCADE"})
    orders: OrderItem[]

//    color
    @ManyToOne(() => ProductColor, {onDelete: "CASCADE"})
    color: Relation<ProductColor>

//    users favorite
    @ManyToMany(() => User, (user) => user.favorite, {onDelete: "CASCADE"})
    user_favorite: User[]
}

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    brand: string

    @Column({nullable: true})
    description: string

    @Column({unique: true})
    slug: string

    @OneToMany(() => Product, (product) => product.brand, {onDelete: "CASCADE"})
    products: Product[]

    @OneToMany(() => Model, (model) => model.brand, {onDelete: "CASCADE"})
    models: Model[]
}

@Entity()
export class Model {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    model: string

    @Column({unique: true})
    slug: string

    @OneToMany(() => Product, (product) => product.model, {onDelete: "CASCADE"})
    products: Product[]

    @ManyToOne(() => Brand, (brand) => brand.models, {onDelete: "CASCADE"})
    brand: Brand

    @ManyToOne(() => Category, (category) => category.models, {onDelete: "CASCADE"})
    category: Relation<Category>
}

@Entity()
export class ProductColor {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    color: string

    @Column({unique: true})
    slug: string

    @Column()
    hex: string

    @OneToMany(() => Product, (product) => product.color, {onDelete: "CASCADE"})
    products: Product[]
}

@Entity()
export class ProductPhoto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    photoUrl: string

    @ManyToOne(() => Product, (product) => product.photos, {onDelete: "CASCADE"})
    product: Product
}

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    category: string

    @Column({unique: true})
    slug: string

    @OneToMany(() => Product, (product) => product.category, {onDelete: "CASCADE"})
    products: Product[]

    @ManyToMany(() => RequiredProperty, (requiredProperty) => requiredProperty.categories, {onDelete: "CASCADE"})
    @JoinTable()
    requiredProperties: RequiredProperty[]

    @OneToMany(() => Model, (model) => model.category, {onDelete: "CASCADE"})
    models: Model[]
}

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    property: string

    @Column()
    propertyValue: string

    @Column()
    propertySlug: string

    @ManyToOne(() => Product, (product) => product.properties, {onDelete: "CASCADE"})
    product: Product
}

@Entity()
export class RequiredProperty {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    slug: string

    @Column({unique: true})
    property: string

    @ManyToMany(() => Category, (category) => category.requiredProperties, {onDelete: "CASCADE"})
    categories: Category[]
}

