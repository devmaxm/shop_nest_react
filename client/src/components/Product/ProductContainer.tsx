import ProductDetail from "./ProductDetail";
import {ProductTypeWithReviews} from "../../types/product-types";
import {connect} from "react-redux";
import {StoreType} from "../../types/store/store";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {loadProduct} from '../../store/actions/products'
import {addToCart} from "../../store/actions/cart";
import {ProfileType} from "../../types/profile-types";
import {CartType} from "../../types/cart-types";
import {addToFavorite, loadProfile, removeFromFavorite} from "../../store/actions/profile";
import {toggleModal} from "../../store/actions/auth";

export type PropsType = {
    loadProduct: (slug: string) => void,

    profile: ProfileType | null
    loadProfile: () => void
    isAuth: boolean
    toggleModal: () => void

    currentProduct: ProductTypeWithReviews | null
    addToCart: (productId: number, quantity: number) => void
    cart: CartType

    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void
}

function ProductContainer(props: PropsType) {
    const {productSlug} = useParams<string>()
    useEffect(() => {
        productSlug && props.loadProduct(productSlug)
        props.isAuth && props.loadProfile()
        document.title = props.currentProduct ? props.currentProduct.title : 'Продукт'
    }, [productSlug])
    return <ProductDetail
        isAuth={props.isAuth}
        toggleModal={props.toggleModal}

        profile={props.profile}
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}

        currentProduct={props.currentProduct}
        addToCart={props.addToCart}
        cart={props.cart}
    />
}

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: state.auth.isAuth,
        profile: state.profile.profile,
        currentProduct: state.products.currentProduct,
        cart: state.cart.cart,

    }
}
export default connect(mapStateToProps, {
    loadProduct,
    addToCart,
    addToFavorite,
    removeFromFavorite,
    toggleModal,
    loadProfile
})(ProductContainer)