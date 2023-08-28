import {Grid} from "@mui/material";
import s from '../Cart.module.css'
import {CartItemType} from "../../../types/cart-types";

type PropsType = {
    item: CartItemType
    deleteItem: (productId: number) => void
    decrementItem: (productId: number) => void
    addToCart: (productId: number, quantity: number) => void
    inOrder: boolean
}

function CartItem(props: PropsType) {
    return (
        <Grid container className={s.cart_item__wrapper}>
            <Grid container item xl={6} md={props.inOrder ? 12 : 6} xs={12} className={`${s.item_info__wrapper} ${props.inOrder && s.in_order}`} sx={{flexWrap: 'nowrap'}}>
                <img
                    src='https://cdn1.it4profit.com/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/resize:fill:115/plain/s3://catalog-products/211019073902691614/211129170021216691.jpg'
                    className={s.item_img}/>
                <div className={s.item_info}>
                    <h1 className={s.item_title}>{props.item.title}</h1>
                    <p className='text'>Артикул: {props.item.code}</p>
                </div>
                <button className={`${s.delete_btn} ${s.desk}`} onClick={() => props.deleteItem(props.item.id)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.7688 10.0096L19.6335 2.14481C20.1222 1.65659 20.1222 0.864449 19.6335 0.376237C19.1449 -0.112391 18.3536 -0.112391 17.865 0.376237L10.0002 8.24099L2.13504 0.376237C1.64641 -0.112391 0.8551 -0.112391 0.366471 0.376237C-0.122157 0.864449 -0.122157 1.65659 0.366471 2.14481L8.23164 10.0096L0.366471 17.8743C-0.122157 18.3625 -0.122157 19.1547 0.366471 19.6429C0.610786 19.8868 0.930979 20.0089 1.25076 20.0089C1.57053 20.0089 1.89073 19.8868 2.13504 19.6425L10.0002 11.7777L17.865 19.6425C18.1093 19.8868 18.4295 20.0089 18.7492 20.0089C19.069 20.0089 19.3892 19.8868 19.6335 19.6425C20.1222 19.1542 20.1222 18.3621 19.6335 17.8739L11.7688 10.0096Z"
                            fill="black"></path>
                    </svg>
                </button>
            </Grid>

            <Grid container item xl={6} md={props.inOrder ? 12 : 6} xs={12}>
                <Grid item xs={6} className={`${s.item_quantity__wrapper} ${props.inOrder && s.in_order}`}>
                    <p className='text' style={{marginBottom: '10px'}}>Количество: </p>
                    <button className={`${s.quantity_btn} ${s.left}`}
                            onClick={() => props.decrementItem(props.item.id)}>-
                    </button>
                    <input
                        readOnly
                        value={props.item.quantity}
                        className={s.item_quantity_input}
                    />
                    <button className={`${s.quantity_btn} ${s.right}`}
                            onClick={() => props.addToCart(props.item.id, 1)}>+
                    </button>
                </Grid>

                <Grid item xs={6} className={`${s.item_total__wrapper} ${props.inOrder && s.in_order}`}>
                    <p className='text' style={{marginBottom: "10px"}}>Цена: </p>
                    <p className={s.price}>
                        {props.item.sale > 0 ?
                            props.item.discountPrice * props.item.quantity :
                            props.item.price * props.item.quantity} руб
                        {props.item.sale > 0 &&
                            <s className={s.old_price}>
                                {props.item.price * props.item.quantity} руб
                            </s>}
                    </p>

                    <button className={`${s.delete_btn} ${s.mobile}`} onClick={() => props.deleteItem(props.item.id)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.7688 10.0096L19.6335 2.14481C20.1222 1.65659 20.1222 0.864449 19.6335 0.376237C19.1449 -0.112391 18.3536 -0.112391 17.865 0.376237L10.0002 8.24099L2.13504 0.376237C1.64641 -0.112391 0.8551 -0.112391 0.366471 0.376237C-0.122157 0.864449 -0.122157 1.65659 0.366471 2.14481L8.23164 10.0096L0.366471 17.8743C-0.122157 18.3625 -0.122157 19.1547 0.366471 19.6429C0.610786 19.8868 0.930979 20.0089 1.25076 20.0089C1.57053 20.0089 1.89073 19.8868 2.13504 19.6425L10.0002 11.7777L17.865 19.6425C18.1093 19.8868 18.4295 20.0089 18.7492 20.0089C19.069 20.0089 19.3892 19.8868 19.6335 19.6425C20.1222 19.1542 20.1222 18.3621 19.6335 17.8739L11.7688 10.0096Z"
                                fill="black"></path>
                        </svg>
                    </button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CartItem