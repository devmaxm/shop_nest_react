import {Controller, Delete, Get, Param, Res} from '@nestjs/common';
import {ProductsService} from "./products.service";
import * as path from 'path';


@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService,
    ) {
    }

    @Get('img/:id')
    async getProductImg(@Param('id') id: number, @Res() res) {
        const product = await this.productsService.findOne(id)
        const filePath = path.join(__dirname, '../../../files/product_photo', product.photo);
        res.sendFile(filePath)
    }

    @Get('category')
    async categoryGetAll() {
        return await this.productsService.categoryGetAllWithModels()
    }
    @Get(':slug')
    async getOne(@Param('slug') slug: string) {
        return await this.productsService.getOneBySlug(slug)
    }

}
