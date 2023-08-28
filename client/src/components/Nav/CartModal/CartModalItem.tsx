import {Grid} from "@mui/material";
import s from '../Nav.module.css'
import {CartItemType} from "../../../types/cart-types";

type PropsType = {
    item: CartItemType
    deleteItem: (productId: number) => void
}

function CartModalItem(props: PropsType) {
    return (
        <Grid container item xs={12} className={s.modal_item_wrapper}>
            <Grid item xs={1.5}>
                <img
                    className={s.item_image}
                    src={require(`../../../../../server/files/product_photo/${props.item.photo}`)}
                />
            </Grid>
            <Grid xs={10.5} item className={s.item_info}>
                <p className={s.title}>{props.item.title}</p>
                <p className={s.amount}>Количество: {props.item.quantity}</p>
                <p className={s.price}>
                    {props.item.discountPrice} руб
                </p>
                {props.item.sale > 0 && <s className={s.old_price}>{props.item.price} руб</s>}
            </Grid>
            <button className={s.delete_btn} onClick={() => props.deleteItem(props.item.id)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 352 512">
                    <path fill="currentColor"
                          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                </svg>
            </button>
        </Grid>
    )
}

export default CartModalItem