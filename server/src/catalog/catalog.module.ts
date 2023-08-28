import {Module} from '@nestjs/common';
import {CatalogService} from './catalog.service';
import {CatalogController} from './catalog.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Brand, Category, Product} from "../products/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
    providers: [CatalogService],
    controllers: [CatalogController]
})
export class CatalogModule {
}
