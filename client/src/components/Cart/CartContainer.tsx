import {connect} from 'react-redux'
import {StoreType} from "../../types/store/store";
import {addToCart, createOrder, decrementItem, deleteItem} from "../../store/actions/cart";
import {CartItemType, CartType} from "../../types/cart-types";
import Cart from "./Cart";
import {UserType} from "../../types/auth-types";
import {useEffect} from "react";

export interface PropsType {
    cart: CartType
    deleteItem: (productId: number) => void
    decrementItem: (productId: number) => void
    addToCart: (productId: number, quantity: number) => void

    user: UserType | null
    createOrder: (
        fullName: string, email: string, phoneNumber: string, country: string, city: string, shippingAddress: string, comment: string,
        userId: number | null, totalPrice: number, totalDiscountPrice: number, items: CartItemType[]
    ) => void

}

function CartContainer(props: PropsType) {
    useEffect(() => {
        document.title = "Корзина"
    }, [])
    return <Cart
        cart={props.cart}
        addToCart={props.addToCart}
        decrementItem={props.decrementItem}
        deleteItem={props.deleteItem}
        user={props.user}
        createOrder={props.createOrder}
    />
}

const mapStateToProps = (state: StoreType) => {
    return {
        cart: state.cart.cart,
        user: state.auth.user
    }
}
export default connect(mapStateToProps, {decrementItem, deleteItem, addToCart, createOrder})(CartContainer)