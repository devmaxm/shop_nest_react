import {BrandType, CategoryType, ColorType, ModelWithRelationsType, ProductWithRelationsType, RequiredPropertyType} from "../product-types";
import {Order} from "../cart-types";

type AdminProductCreate = {
    requiredFields: RequiredPropertyType[] | null
    brand: BrandType | null
    category: CategoryType | null
}

export type QuestionType = {
    id: number,
    email: number,
    question: number
}

export type DeleteModalType = {
    isActive: boolean,
    type: string,
    id: number
}

export type AdminStateType = {
    product: {
        products: ProductWithRelationsType[] | [],
        create: AdminProductCreate,

    },
    color: {
        colors: ColorType[] | []
    },
    category: {
        categories: CategoryType[] | []
    },
    property: {
        properties: RequiredPropertyType[] | []
    },
    brand: {
        brands: BrandType[] | []
    },
    model: {
        models: ModelWithRelationsType[] | []
    },
    question: {
        questions: QuestionType[] | []
    },
    order: {
        orders: Order[] | []
    }
    deleteModal: DeleteModalType
}