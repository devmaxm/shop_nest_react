import {Grid} from "@mui/material";
import s from '../Cart.module.css'
import {NavLink} from "react-router-dom";

function CartItemsTotal(props: { totalDiscountPrice: number }) {
    return (
        <Grid container sx={{paddingTop: "50px"}}>
            <Grid container item xs={12} sx={{padding: '20px 0', borderBottom: '1px solid #e5e5e5'}}>
                <Grid item md={4} xs={12} className={s.cartTotalInfoWrapper} sx={{marginLeft: 'auto'}}>
                    <div className={s.totalPriceWrapper}>
                        <p className={s.totalTitle}>Общая стоимость</p>
                        <p className={s.totalPrice}>{props.totalDiscountPrice} руб</p>
                    </div>
                </Grid>
            </Grid>
            <Grid container item sm={12} sx={{paddingTop: "20px"}}>
                <NavLink className={s.create_order_link} to='order'>
                    Оформить заказ
                </NavLink>
            </Grid>
        </Grid>
    )
}

export default CartItemsTotal