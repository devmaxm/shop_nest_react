import {Grid} from "@mui/material";
import s from '../Profile.module.css'
import {useOutletContext} from "react-router-dom";
import {PropsType} from "../Profile";
import OrderItem from "./OrderItem";

function ProfileOrders() {
    const {orders} = useOutletContext<PropsType>()
    const rows = orders?.map((order) => <OrderItem order={order}/>)

    return (
        <Grid container className={`full_screen_height ${s.orders_wrapper}`}>
            <h1 className={s.orders_title}>Ваши заказы</h1>
            <Grid container item xs={12}>
                <Grid container item md={12} display={{md: "flex", xs: 'none'}}>
                    <Grid xs={0.5} item className={s.order_item}>#</Grid>
                    <Grid xs={2.5} item className={s.order_item}>ФИО</Grid>
                    <Grid xs={2.5} item className={s.order_item}>Номер телефона</Grid>
                    <Grid xs={2.5} item className={s.order_item}>email</Grid>
                    <Grid xs={1} item className={s.order_item}>Цена</Grid>
                    <Grid xs={2} item className={s.order_item}>Оплачено</Grid>
                    <Grid xs={1} item className={s.order_item}>Кол-во товаров</Grid>
                </Grid>
                {/*item*/}
                {rows && rows}
            </Grid>
        </Grid>
    )
}

export default ProfileOrders