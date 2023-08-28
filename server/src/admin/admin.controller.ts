import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {ProductsService} from "../products/products.service";
import {RolesGuard} from "../roles/roles.guard";
import {Role} from '../roles/roles.decorator'
import {RolesEnum} from "../roles/roles.enum";
import {JwtGuard} from "../auth/guards/jwt.guard";
import {
    BodyCreateProductDto,
    CreateBrandDto,
    CreateCategoryDto,
    CreateColorDto,
    CreateModelDto,
} from "../products/products.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from 'path';
import {AdminService} from "./admin.service";
import {ReviewsService} from "../reviews/reviews.service";
import {CreateReviewDto} from "../reviews/reviews.dto";
import {QuestionService} from "../question/question.service";
import {OrdersService} from "../orders/orders.service";

@UseGuards(RolesGuard, JwtGuard)
@Controller('admin')
export class AdminController {
    constructor(
        private productsService: ProductsService,
        private adminService: AdminService,
        private reviewsService: ReviewsService,
        private questionService: QuestionService,
        private ordersService: OrdersService,
    ) {
    }

    //product
    @Role(RolesEnum.Admin)
    @Get('product')
    async getALlProducts() {
        return await this.productsService.getAllProducts()
    }
    @Role(RolesEnum.Admin)
    @Post('product')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'mainPhoto', maxCount: 1},
        {name: 'otherPhotos', maxCount: 5},
    ], {storage: diskStorage({
            destination: './files/product_photo',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${path.extname(file.originalname)}`);
            },
        }),}))
    async addProduct(
        @UploadedFiles() photo,
        @Body(new ValidationPipe()) product: BodyCreateProductDto,
    ) {
        const {title, description, code, properties, slug, ...data} = product

        const productData = {
            title,
            description,
            code,
            properties: JSON.parse(properties),
            priceUAN: parseInt(data.priceUAN),
            sale: parseInt(data.sale),
            availableQuantity: parseInt(data.availableQuantity),
            brandId: parseInt(data.brandId),
            modelId: parseInt(data.modelId),
            categoryId: parseInt(data.categoryId),
            colorId: parseInt(data.colorId),
            slug
        }
        return await this.productsService.create(productData, photo.mainPhoto, photo.otherPhotos)
    }
    @Role(RolesEnum.Admin)
    @Delete('product/:id')
    async deleteProduct(@Param("id") id: number) {
        return await this.productsService.productDelete(id)
    }
    @Role(RolesEnum.Admin)
    @Get('product/fields/:modelId')
    async generateFieldsByModel(@Param('modelId') modelId: number) {
        return await this.productsService.generateFieldsByModel(modelId)
    }

    //reviews
    @Role(RolesEnum.Admin)
    @Post('product/reviews')
    async createProductReview(@Body(new ValidationPipe()) body: CreateReviewDto) {
        body.rating && await this.reviewsService.setRating(body.rating, body.productId, body.username)
        return await this.reviewsService.createReview(body.productId, body.review, body.username, body.createdAt)
    }

    //color
    @Role(RolesEnum.Admin)
    @Post('color')
    async addColor(@Body(new ValidationPipe()) color: CreateColorDto) {
        const createdColor = await this.productsService.colorCreate(color)
        return {color: createdColor}
    }
    @Role(RolesEnum.Admin)
    @Get('color')
    async getAllColor() {
        const colors = await this.productsService.colorGetAll()
        return {colors}
    }

    @Role(RolesEnum.Admin)
    @Delete('color/:id')
    async deleteColor(@Param('id') id: string) {
        return await this.productsService.colorDelete(parseInt(id))
    }

    //brand
    @Role(RolesEnum.Admin)
    @Post('brand')
    async addBrand(@Body(new ValidationPipe()) brand: CreateBrandDto) {
        const createdBrand = await this.productsService.brandCreate(brand)
        return {brand: createdBrand}
    }
    @Role(RolesEnum.Admin)
    @Get('brand')
    async getAllBrands() {
        const brands = await this.productsService.brandGetAll()
        return {brands}
    }
    @Role(RolesEnum.Admin)
    @Delete('brand/:id')
    async deleteBrand(@Param('id') id: string) {
        return await this.productsService.brandDelete(parseInt(id))
    }

    //category
    @Role(RolesEnum.Admin)
    @Post('category')
    async addCategory(@Body(new ValidationPipe()) body: CreateCategoryDto) {
        const createdCategory = await this.productsService.categoryCreate(body)
        return {category: createdCategory}
    }
    @Role(RolesEnum.Admin)
    @Get('category')
    async getAllCategories() {
        const categories = await this.productsService.categoryGetAll()
        return {categories}
    }
    @Role(RolesEnum.Admin)
    @Delete('category/:id')
    async deleteCategory(@Param('id') id: string) {
        return await this.productsService.categoryDelete(parseInt(id))
    }

    //property
    @Role(RolesEnum.Admin)
    @Post('required-property')
    async addRequiredProperty(@Body(new ValidationPipe()) body: { property: string, slug: string}) {
        const createdProperty = await this.productsService.requiredPropertyCreate(body.property, body.slug)
        return {property: createdProperty}
    }
    @Role(RolesEnum.Admin)
    @Get('required-property')
    async getAllRequiredProperties() {
        const properties = await this.productsService.requiredPropertyGetAll()
        return {properties}
    }
    @Delete('required-property/:id')
    async deleteRequiredProperty(@Param('id') id: string) {
        return await this.productsService.requiredPropertyDelete(parseInt(id))
    }

    //model
    @Role(RolesEnum.Admin)
    @Get('model')
    async getAllModels() {
        const models = await this.productsService.modelGetAll()
        return models
    }
    @Role(RolesEnum.Admin)
    @Post('model')
    async addModel(@Body(new ValidationPipe()) model: CreateModelDto) {
        const createdModel = await this.productsService.modelCreate(model)

        return {model: createdModel}
    }
    @Role(RolesEnum.Admin)
    @Delete('model/:id')
    async deleteModel(@Param('id') id: string) {
        return await this.productsService.modelDelete(parseInt(id))
    }

    //admin
    @Role(RolesEnum.Admin)
    @Post('user/role/admin/:userId')
    async giveUserAdminRole(@Param('userId') userId: number) {
        return await this.adminService.giveUserAdminRole(userId)
    }

    //reviews
    @Role(RolesEnum.Admin)
    @Post('reviews/:id')
    async moderateReview(@Param('id') id: number) {
        return await this.adminService.moderateReview(id)
    }

    //questions
    @Role(RolesEnum.Admin)
    @Get('question')
    async getAllQuestions() {
        return await this.questionService.getAll()
    }
    @Role(RolesEnum.Admin)
    @Delete('question/:id')
    async deleteQuestion(@Param('id') id: string) {
        return await this.questionService.deleteQuestion(parseInt(id))
    }

    //orders
    @Role(RolesEnum.Admin)
    @Get('orders')
    async getAllOrders() {
        const orders = await this.ordersService.getAllOrders()
        return {orders}
    }
}

