import {
    Controller,
    Get,
    Param,
    Query
} from '@nestjs/common';

import {CatalogService} from "./catalog.service";

@Controller('catalog')
export class CatalogController {
    constructor(
        private catalogService: CatalogService
    ) {
    }

    @Get()
    async catalog(
        @Query() query
    ) {
        return await this.catalogService.catalog(query)
    }

    @Get(':category')
    async catalogByCategory(
        @Param('category') category: string,
        @Query() query
    ) {
        return await this.catalogService.catalogByCategory(category, query)
    }
}
