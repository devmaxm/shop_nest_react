import {Injectable, HttpException, HttpStatus, Inject, forwardRef} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    Brand,
    Category,
    Model,
    Product,
    ProductColor,
    ProductPhoto,
    Property,
    RequiredProperty
} from "./products.entity";
import {CreateBrandDto, CreateCategoryDto, CreateColorDto, CreateModelDto, CreateProductDto} from "./products.dto";
import {ReviewsService} from "../reviews/reviews.service";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,
        @InjectRepository(Property)
        private propertyRepository: Repository<Property>,
        @InjectRepository(Model)
        private modelRepository: Repository<Model>,
        @InjectRepository(ProductColor)
        private colorRepository: Repository<ProductColor>,
        @InjectRepository(ProductPhoto)
        private photoRepository: Repository<ProductPhoto>,
        @InjectRepository(RequiredProperty)
        private requiredPropertyRepository: Repository<RequiredProperty>,
        @Inject(forwardRef(() => ReviewsService))
        private reviewsService: ReviewsService,
    ) {
    }

    //Product
    async generateFieldsByModel(modelId: number) {
        const modelQueryBuilder = await this.modelRepository.createQueryBuilder('model')
            .leftJoinAndSelect('model.brand', 'brand')
            .leftJoinAndSelect('model.category', 'category')
            .andWhere("model.id = :modelId", {modelId})
        const fields = await modelQueryBuilder.getOne()
        const categoryQueryBuilder = await this.categoryRepository.createQueryBuilder('category')
            .leftJoinAndSelect('category.requiredProperties', 'requiredProperties')
            .andWhere('category.id = :id', {id: fields.category.id})
        const requiredFields = await categoryQueryBuilder.getOne()
        const response = {
            brand: fields.brand,
            category: fields.category,
            requiredFields: requiredFields.requiredProperties
        }
        return response
    }
    async create(
        productData: CreateProductDto, mainPhoto: Express.Multer.File, otherPhotos: Express.Multer.File[]
    ) {
        const {categoryId, brandId, modelId, colorId, properties, ...product} = productData
        const brand = await this.brandRepository.findOneBy({id: brandId})
        if (!brand) {
            throw new HttpException({message: "brand not found"}, HttpStatus.NOT_FOUND)
        }
        const model = await this.modelRepository.findOneBy({id: modelId})
        if (!model) {
            throw new HttpException({message: "model not found"}, HttpStatus.NOT_FOUND)
        }
        const color = await this.colorRepository.findOneBy({id: colorId})
        if (!color) {
            throw new HttpException({message: "color not found"}, HttpStatus.NOT_FOUND)
        }
        const category = await this.categoryRepository.findOneBy({id: categoryId})
        if (!category) {
            throw new HttpException({message: "category not found"}, HttpStatus.NOT_FOUND)
        }
        const createdProduct = await this.productRepository.create({
            ...product,
            brand,
            color,
            model,
            category,
            photo: mainPhoto[0].filename
        })

        await this.productRepository.save(createdProduct)
        const photos = otherPhotos.map((p) => ({photoUrl: p.filename, product: createdProduct}))
        await this.photoRepository.save(photos)
        const property = properties.map(p => ({...p, product: createdProduct}))
        await this.propertyRepository.save(property)
        return createdProduct
    }
    async productDelete(id: number) {
        return await this.productRepository.createQueryBuilder('product')
            .delete()
            .where('product.id = :id', {id})
            .execute()
    }
    async getAllProducts() {
        const queryBuilder = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.model', 'model')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.color', 'color')
            .leftJoinAndSelect('product.category', 'category')
        const [products, count] = await queryBuilder.getManyAndCount()

        return {products, count}
    }
    async findOne(id) {
        return await this.productRepository.findOneBy({id})
    }
    async getOneBySlug(slug: string) {
        const queryBuilderProduct = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.photos', 'photos')
            .leftJoinAndSelect('product.color', 'color')
            .leftJoinAndSelect('product.model', 'model')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.properties', 'properties')
            .where('product.slug = :slug', {slug})

        const product = await queryBuilderProduct.getOne()
        if (!product) {
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND)
        }
        const ratingCount = await queryBuilderProduct
            .leftJoin('product.rating', 'rating')
            .select('COUNT(rating)', 'ratingCount')
            .getRawOne()
        const averageRating = await this.reviewsService.getAverageRating(product.id)
        const reviews = await this.reviewsService.getReviewsByProductId(product.id)
        return {
            ...product,
            averageRating,
            reviews,
            ratingCount: parseInt(ratingCount.ratingCount)
        }
    }
    async getOne(id: number) {
        return await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.reviews', 'reviews')
            .andWhere('product.id = :id', {id})
            .getOne()
    }

    // Category
    async categoryCreate(category: CreateCategoryDto): Promise<Category> {
        const createdCategory = await this.categoryRepository.create({category: category.category, slug: category.slug})
        const props = await this.requiredPropertyRepository.findByIds(category.requiredProperties)
        createdCategory.requiredProperties = props
        await this.categoryRepository.save(createdCategory)
        return createdCategory
    }
    async categoryGetOne(id: number) {
        return this.categoryRepository.findOneBy({id})
    }
    async categoryGetOneBySlug(slug: string) {
        return this.categoryRepository.findOneBy({slug})
    }
    async categoryGetAll() {
        return await this.categoryRepository.find()
    }
    async categoryGetAllWithModels() {
        const queryBuilder = await this.categoryRepository.createQueryBuilder('category')
            .leftJoinAndSelect('category.models', 'models')
        const response = await queryBuilder.getManyAndCount()
        const [categories, count] = response
        return {categories, count}
    }
    async categoryDelete(id: number) {
        return await this.categoryRepository.createQueryBuilder('category')
            .delete()
            .where('category.id = :id', {id})
            .execute()
    }


//    Color
    async colorCreate(color: CreateColorDto) {
        const createdColor = await this.colorRepository.create(color)
        await this.colorRepository.save(createdColor)
        return createdColor
    }
    async colorGetAll() {
        return await this.colorRepository.find()
    }
    async colorDelete(id: number) {
        await this.colorRepository.createQueryBuilder('product_color')
            .delete()
            .where("product_color.id = :id", { id })
            .execute()
        return {status: 204}
    }
//    Model
    async modelGetAll() {
        const queryBuilder = await this.modelRepository.createQueryBuilder('model')
            .leftJoinAndSelect('model.brand', 'brand')
            .leftJoinAndSelect('model.category', 'category')
        const [models, count] = await queryBuilder.getManyAndCount()
        return {models, count}
    }
    async modelCreate(model: CreateModelDto) {
        const brand = await this.findBrand(model.brandId)
        const category = await this.categoryGetOne(model.categoryId)
        const createdModel = await this.modelRepository.create({model: model.model, slug: model.slug, brand, category})
        await this.modelRepository.save(createdModel)
        return createdModel
    }
    async modelDelete(id: number) {
        await this.modelRepository.createQueryBuilder('model')
            .delete()
            .where('model.id = :id', {id})
            .execute()
        return {status: 204}
    }

//    Brand
    async brandCreate(brand: CreateBrandDto) {
        const createdBrand = await this.brandRepository.create(brand)
        await this.brandRepository.save(createdBrand)
        return createdBrand
    }
    async brandGetAll() {
        return await this.brandRepository.find()
    }
    async findBrand(id: number) {
        const brand = await this.brandRepository.findOneBy({id})
        console.log(id)
        if (!brand) {
            throw new HttpException({message: "Brand not found"}, HttpStatus.NOT_FOUND)
        }
        return brand
    }
    async brandDelete(id: number) {
        await this.brandRepository.createQueryBuilder('brand')
            .delete()
            .where('brand.id = :id', {id})
            .execute()
        return {status: 204}
    }

//    RequiredProperty
    async requiredPropertyCreate(property: string, slug: string) {
        const createdProperty = await this.requiredPropertyRepository.create({property, slug})
        await this.requiredPropertyRepository.save(createdProperty)
        return createdProperty
    }
    async requiredPropertyGetAll() {
        return await this.requiredPropertyRepository.find()
    }
    async requiredPropertyDelete(id:number) {
        await this.requiredPropertyRepository.createQueryBuilder('required_property')
            .where('required_property.id = :id', {id})
            .delete()
            .execute()
        return {status: 204}
    }
}
