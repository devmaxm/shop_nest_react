import {IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";
import {Type} from 'class-transformer'

export class PropertyDto {
    @IsNotEmpty()
    property: string

    @IsNotEmpty()
    propertyValue: string

    @IsString()
    propertySlug
}

export class CreateProductDto {
    @IsString()
    title: string;

    @IsString()
    description: string

    @IsString()
    code: string

    @IsNumber()
    priceUAN: number

    @IsNumber()
    sale: number

    @IsNumber()
    availableQuantity: number

    @IsArray()
    @ValidateNested()
    @Type(() => PropertyDto)
    properties: PropertyDto[]

    @IsNumber()
    brandId: number

    @IsNumber()
    modelId: number

    @IsNumber()
    categoryId: number

    @IsNumber()
    colorId: number

    @IsString()
    slug: string
}
export class BodyCreateProductDto {
    title: string;
    description: string
    code: string
    priceUAN: string
    sale: string
    availableQuantity: string
    properties: string
    brandId: string
    modelId: string
    categoryId: string
    colorId: string;
    slug: string
}

export class CreateColorDto {
    @IsString()
    color: string;
    @IsString()
    hex: string;
    @IsString()
    slug: string;
}

export class CreateModelDto {
    @IsString()
    model: string

    @IsString()
    slug: string;

    @IsNumber()
    brandId: number

    @IsNumber()
    categoryId: number
}

export class CreateBrandDto {
    @IsString()
    brand: string

    @IsString()
    description: string

    @IsString()
    slug: string
}


export class CreateCategoryDto {
    @IsString()
    category: string

    @IsString()
    slug: string

    //requiredPropertiesIds
    @IsArray()
    requiredProperties: number[]
}


//Interfaces
export type CategoryType = {
    id: number
    category: string
    slug: string
}
interface BrandInterface {
    id: number
    brand: string
    description: string
    slug: string
}
interface PropertyInterface {
    id: number
    property: string
    propertyValue: string
    propertySlug: string
}
export interface ColorInterface {
    id: number;
    color: string;
    hex: string;
    slug: string;
}
interface ProductInterface {
    id: number
    title: string
    description: string
    priceUAN: number
    priceUSD: number | null
    sale: number
    availableQuantity: number
    isAvailable: boolean
    createdAt: Date
    photo: string
    category: CategoryType
    brand: BrandInterface
    // mode: ModelType
    properties: PropertyInterface[]
    color: ColorInterface
    slug: string
}
export interface ModelInterface {
    id: number;
    slug: string;
    model: string;
}
export interface ProductQueryInterface {
    products: ProductInterface[]
    productCount: number
    maxPrice: number
    minPrice: number
}