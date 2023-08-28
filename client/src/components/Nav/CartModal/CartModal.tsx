import {Grid} from "@mui/material";
import {CartType} from "../../../types/cart-types";
import s from '../Nav.module.css'
import CartModalItem from "./CartModalItem";
import CartModalFooter from "./CartModalFooter";

type PropsType = {
    cart: CartType
    isActive: boolean
    deleteItem: (productId: number) => void
}

function CartModal(props: PropsType) {
    return (
        <Grid container className={s.cart_modal_wrapper} sx={{display: `${props.isActive ? "flex": 'none'}`}}>
            {props.cart.items.length === 0 && <p className={s.empty_cart_text}>Ваша корзина пуста</p>}
            {props.cart.items.length > 0 && <CartModalItem item={props.cart.items[0]} deleteItem={props.deleteItem} />}
            {props.cart.items.length > 0 && <CartModalFooter cart={props.cart}  />}
        </Grid>
    )
}

export default CartModal