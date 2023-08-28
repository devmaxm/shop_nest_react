import Catalog from "./Catalog";
import {CatalogType} from "../../types/catalog-types";
import {StoreType} from "../../types/store/store";
import {connect} from "react-redux";
import {loadProductByCategory, loadProducts, toggleIsLoading} from "../../store/actions/catalog";
import {loadProfile, addToFavorite, removeFromFavorite} from "../../store/actions/profile";
import {toggleModal} from "../../store/actions/auth";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {addToCart} from "../../store/actions/cart";
import {CartType} from "../../types/cart-types";
import {ProfileType} from "../../types/profile-types";

type PropsType = {
    profile: ProfileType | null
    loadProfile: () => void
    isAuth: boolean
    toggleModal: () => void

    catalog: CatalogType,
    loadProductByCategory: (category: string, query: string) => void
    loadProducts: (query: string) => void

    cart: CartType
    addToCart: (productId:number, quantity: number) => void
    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void
}

function ContainerCatalog(props: PropsType) {
    const {category} = useParams<string>()
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        props.loadProfile()
        category ? props.loadProductByCategory(category, searchParams.toString()) : props.loadProducts(searchParams.toString())
        document.title = props.catalog.category ?  props.catalog.category.category : "Каталог"
    }, [category, searchParams])

    return <>
        <Catalog
            catalog={props.catalog}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            filterValues={props.catalog.filterValues}
            addToCart={props.addToCart}
            cart={props.cart}
            addToFavorite={props.addToFavorite}
            removeFromFavorite={props.removeFromFavorite}
            profile={props.profile}
            isAuth={props.isAuth}
            toggleModal={props.toggleModal}
        />
    </>
}

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: state.auth.isAuth,
        profile: state.profile.profile,
        catalog: state.catalog.catalog,
        cart: state.cart.cart,

    }
}
export default connect(mapStateToProps, {
    loadProductByCategory,
    toggleIsLoading,
    addToCart,
    addToFavorite,
    removeFromFavorite,
    loadProfile,
    toggleModal,
    loadProducts
})(ContainerCatalog)
