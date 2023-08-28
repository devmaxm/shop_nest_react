import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Brand, Category, Product} from "../products/products.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ResultInterface} from "./catalog.dto";
import {CategoryType} from "../products/products.dto";


@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {
    }

    async catalog(query) {
        const currentPage = parseInt(query.page) || 1;
        const take = query.take || 12
        const skip = (currentPage - 1) * take;

        const queryBuilder = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.properties', 'properties')
            .leftJoinAndSelect('product.model', 'model')
            .leftJoinAndSelect('product.color', 'color')
            .take(take)
            .skip(skip)

        if (query.search) {
            const search: string = query.search.toLowerCase()
            const searchQuery = `%${search}%`
            await queryBuilder.andWhere('product.title ILIKE :searchQuery OR product.description ILIKE :searchQuery OR product.slug ILIKE :searchQuery', {searchQuery})
        }

        if (query.price) {
            query.price == "desc" && await queryBuilder.addOrderBy("product.priceUAN", "DESC")
            query.price == "asc" && await queryBuilder.addOrderBy("product.priceUAN", "ASC")
        }

        if (query.max_price) {
            await queryBuilder.andWhere('product.priceUAN <= :max_price', {max_price: query.max_price})
        }

        if (query.min_price) {
            await queryBuilder.andWhere('product.priceUAN >= :min_price', {min_price: query.min_price})
        }

        const [products, count] = await queryBuilder.getManyAndCount()

        const availableCategories = await this.getAvailableCategories(products)
        const filterValues = {
            availableCategories
        }
        return {
            products,
            filterValues,
            productCount: count,
            currentPage,
            pageSize: take,
        }
    }

    async catalogByCategory(category: string, query) {
        const {brand, model, max_price, min_price, search, color, price, page, ...properties} = query

        const currentPage = parseInt(page) || 1;
        const take = query.take || 12
        const skip = (currentPage - 1) * take;

        const queryBuilder = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.properties', 'properties')
            .leftJoinAndSelect('product.model', 'model')
            .leftJoinAndSelect('product.color', 'color')
            .take(take)
            .skip(skip)

        if (category) {
            await queryBuilder.where('category.slug = :category', {category})
        }


        if (properties) {
            for (const [property, propertyValues] of Object.entries(properties)) {
                const props = Array.isArray(propertyValues) ? propertyValues : [propertyValues]
                await queryBuilder.andWhere('properties.propertySlug = :property AND properties.propertyValue IN (:...props)', {
                    property,
                    props
                })
            }
        }

        if (price) {
            price == "desc" && await queryBuilder.addOrderBy("product.priceUAN", "DESC")
            price == "asc" && await queryBuilder.addOrderBy("product.priceUAN", "ASC")
        }

        if (brand) {
            await queryBuilder.andWhere('brand.slug = :brand', {brand})
        }

        if (model) {
            const models = Array.isArray(model) ? model : [model]
            await queryBuilder.andWhere('model.slug IN (:...models)', {models})
        }

        if (max_price) {
            await queryBuilder.andWhere('product.priceUAN <= :max_price', {max_price})
        }

        if (min_price) {
            await queryBuilder.andWhere('product.priceUAN >= :min_price', {min_price})
        }

        if (search) {
            const searchQuery = `%${search}%`
            await queryBuilder.andWhere('product.title LIKE :searchQuery OR product.description LIKE :searchQuery', {searchQuery})
        }

        if (color) {
            const colors = Array.isArray(color) ? color : [color]
            await queryBuilder.andWhere('color.slug IN (:...colors)', {colors})
        }

        const response = await queryBuilder.getManyAndCount()

        const categoryQuery = await this.categoryRepository.findOneBy({slug: category})
        const [products, productCount] = response
        const filterValues = await this.getFilterParamsByCategoryAndModel(category)
        const {...minCost} = await queryBuilder.orderBy('product.priceUAN', 'ASC').addSelect('product.priceUAN as minCost').getOne()
        const {...maxCost} = await queryBuilder.orderBy('product.priceUAN', 'DESC').addSelect('product.priceUAN as maxCost').getOne()
        return {
            products,
            productCount,
            currentPage,
            pageSize: take,
            category: categoryQuery,
            maxPrice: maxCost.priceUAN,
            minPrice: minCost.priceUAN,
            filterValues
        }
    }

    async getFilterParamsByCategoryAndModel(category: string) {
        const result: ResultInterface = {
            availableColors: [],
            availableModels: [],
            availableProperties: []
        }
        const queryBuilder = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.properties', 'properties')
            .leftJoinAndSelect('product.color', 'color')
            .where('category.slug = :category', {category})
            .leftJoinAndSelect('category.models', 'models')
        const productQuery = await queryBuilder.getMany()
        productQuery.forEach((product: Product) => {
            product.properties.forEach(property => {
                const isPropExist = result.availableProperties.find(p => p.name === property.property)
                if (isPropExist) {
                    !isPropExist.values.includes(property.propertyValue) && isPropExist.values.push(property.propertyValue)
                } else {
                    result.availableProperties.push({
                        name: property.property,
                        slug: property.propertySlug,
                        values: [property.propertyValue]
                    })
                }
            })
            const checkColor = result.availableColors.filter(color => color.id === product.color.id)
            if (checkColor.length !== 1) {
                result.availableColors.push(product.color)
            }
        })
        const models = await this.categoryRepository.createQueryBuilder('category')
            .where('category.slug = :category', {category})
            .leftJoinAndSelect('category.models', 'models')
            .getOne()
        result.availableModels.push(...models.models)
        return result
    }

    async getAvailableCategories(products: Product[]) {
        const availableCategories: CategoryType[] = []
        products.forEach((product) => {
            const isExist = availableCategories.find((c) => c.id === product.category.id)
            if (!isExist) {
                availableCategories.push(product.category)
            }
        })
        return availableCategories
    }
}
