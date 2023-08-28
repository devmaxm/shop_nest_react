import {Grid} from "@mui/material";
import s from '../Profile.module.css'
import {Order} from "../../../types/cart-types";

type PropsType = {
    order: Order
}

function OrderItem(props: PropsType) {

    return (
        <>
            <Grid container item md={12} display={{md: "flex", xs: 'none'}}>
                <Grid xs={0.5} item className={s.order_item}><p className={s.order_item}>{props.order.id}</p></Grid>
                <Grid xs={2.5} item className={s.order_item}>{props.order.fullName}</Grid>
                <Grid xs={2.5} item className={s.order_item}>{props.order.phoneNumber}</Grid>
                <Grid xs={2.5} item className={s.order_item}>{props.order.email}</Grid>
                <Grid xs={1} item className={s.order_item}>{props.order.totalDiscountPrice}</Grid>
                <Grid xs={2} item className={s.order_item}>{props.order.isPaid ?
                    <span className='available_text'>Оплачено</span>
                    :
                    <span className='unavailable_text'>Не оплачено</span>}
                </Grid>
                <Grid xs={1} item className={s.order_item}>{props.order.products.length}</Grid>
            </Grid>

            <Grid container item xs={12} className={s.order_item__wrapper__mobile} display={{md: 'none', xs: 'flex'}} sx={{marginBottom: "20px"}}>
                <p className={s.order_item}>Номер заказа: {props.order.id}</p>
                <p className={s.order_item}>ФИО: {props.order.fullName}</p>
                <p className={s.order_item}>Номер телефона: {props.order.phoneNumber}</p>
                <p className={s.order_item}>Email: {props.order.email}</p>
                <p className={s.order_item}>Цена: {props.order.totalDiscountPrice}</p>
                <p className={s.order_item}>Оплачено: {props.order.isPaid ?
                    <span className='available_text'>Оплачено</span>
                    :
                    <span className='unavailable_text'>Не оплачено</span>}
                </p>
                <p className={s.order_item}>Кол-во товаров: {props.order.products.length}</p>
            </Grid>
        </>
    )
}

export default OrderItem