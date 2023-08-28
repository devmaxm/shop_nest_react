import AdminProduct from "./AdminProduct";
import {connect} from "react-redux";
import {StoreType} from "../../../types/store/store";
import {
    loadProducts,
    loadColors,
    loadModels,
    setRequiredFields,
    addProduct,
    createReview,
    toggleModal
} from "../../../store/actions/admin";
import {useEffect} from "react";
import {
    BrandType, CategoryType, ColorType,
    ModelWithRelationsType,
    ProductWithRelationsType, PropertyType,
    RequiredPropertyType
} from "../../../types/product-types";

export type PropsType = {
    loadProducts: () => void
    loadColors: () => void
    loadModels: () => void

    products: ProductWithRelationsType[],
    models: ModelWithRelationsType[]
    requiredFields: RequiredPropertyType[] | null
    brand: BrandType | null
    category: CategoryType | null
    colors: ColorType[]
    setRequiredFields: (modelId: number) => void
    addProduct: (title: string, description: string,
                 priceUAN: string, sale: string, colorId: string, availableQuantity: string, mainPhoto: File, otherPhotos: FileList,
                 modelId: string, properties: PropertyType[], categoryId: string, brandId: string, slug: string, code: string) => void
    createReview: (productId: number, review: string, username: string, rating: number | null, createdAt: string) => void
    toggleModal: (modalType?: string, id?: number) => void
}

function ContainerAdminProduct(props: PropsType) {
    useEffect(() => {
        props.loadProducts()
        props.loadColors()
        props.loadModels()
    }, [])
    return <AdminProduct
        products={props.products}
        requiredFields={props.requiredFields}
        brand={props.brand} category={props.category} colors={props.colors} models={props.models}
        setRequiredFields={props.setRequiredFields} addProduct={props.addProduct}
        createReview={props.createReview} toggleModal={props.toggleModal}
    />
}

const mapStateToProps = (state: StoreType) => {
    return {
        products: state.admin.product.products,
        requiredFields: state.admin.product.create.requiredFields,
        brand: state.admin.product.create.brand,
        category: state.admin.product.create.category,
        colors: state.admin.color.colors,
        models: state.admin.model.models,
    }
}

export default connect(mapStateToProps, {
    loadProducts,
    loadColors,
    loadModels,
    setRequiredFields,
    addProduct,
    createReview, toggleModal
})(ContainerAdminProduct)