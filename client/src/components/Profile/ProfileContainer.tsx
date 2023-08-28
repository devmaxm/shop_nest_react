import Profile from "./Profile";
import {connect} from "react-redux";
import {StoreType} from "../../types/store/store";
import {loadOrders, loadProfile, removeFromFavorite} from "../../store/actions/profile";
import {addToCart} from "../../store/actions/cart";
import {addToFavorite} from "../../store/actions/profile";
import {ProfileType} from "../../types/profile-types";
import {CartType, Order} from "../../types/cart-types";
import {logout} from "../../store/actions/auth";
import {useEffect} from "react";

type PropsType = {
    profile: ProfileType | null
    isAuth: boolean
    orders: Order[] | null
    cart: CartType
    loadProfile: () => void
    loadOrders: () => void
    logout: () => void

    addToCart: (productId: number, quantity: number) => void
    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void

}

function ProfileContainer(props: PropsType) {
    useEffect(() => {
        props.loadProfile()
        props.loadOrders()
        document.title = "Профиль"
    }, [])

    return <Profile
        profile={props.profile}
        cart={props.cart}
        addToCart={props.addToCart}
        addToFavorite={props.addToFavorite}
        removeFromFavorite={props.removeFromFavorite}
        logout={props.logout}
        orders={props.orders}
        isAuth={props.isAuth}

    />
}

const mapStateToProps = (state: StoreType) => {
    return {
        profile: state.profile.profile,
        orders: state.profile.myOrders,
        cart: state.cart.cart,
        isAuth: state.auth.isAuth,
    }
}
export default connect(mapStateToProps, {
    loadProfile,
    loadOrders,
    addToCart,
    addToFavorite,
    removeFromFavorite,
    logout
})(ProfileContainer)