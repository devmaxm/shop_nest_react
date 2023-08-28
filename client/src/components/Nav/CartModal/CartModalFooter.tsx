import {CartType} from "../../../types/cart-types";
import {Grid} from "@mui/material";
import s from '../Nav.module.css'
import {NavLink} from "react-router-dom";
import {deleteItem} from "../../../store/actions/cart";

type PropsType = {
    cart: CartType
}

function CartModalFooter(props: PropsType) {
    return (
        <Grid container item xs={12} className={s.modal_footer_wrapper}>
            <Grid item xs={6}>
                <p className={s.total_price_title}>Общая стоимость товаров: </p>
                <p className={s.total_price}>{props.cart.totalDiscountPrice} руб</p>
            </Grid>
            <Grid item xs={6}>
                <NavLink to='/cart' className={s.to_cart_link}>Перейти к корзине</NavLink>
            </Grid>
        </Grid>
    )
}

export default CartModalFooter