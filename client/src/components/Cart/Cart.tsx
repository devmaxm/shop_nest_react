import {Grid} from "@mui/material";

import s from './Cart.module.css';
import React from "react";
import {Outlet} from "react-router-dom";
import {CartItemType, CartType} from "../../types/cart-types";
import {UserType} from "../../types/auth-types";


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

function Cart(props: PropsType) {
    return (
        <div className='grey_bg'>
            <Grid container className={`full_screen_height ${s.cart_wrapper}`}>
                <Grid item sm={12} sx={{height: 'fit-content'}}>
                    <h1 className={s.cart_title}>Моя корзина</h1>
                    {props.cart.items.length === 0 && <h1 className={`${s.cart_title} ${s.empty}`}>Ваша корзина пуста</h1>}
                </Grid>
                <Grid item container>
                    <Outlet
                        context={{
                            cart: props.cart,
                            decrementItem: props.decrementItem,
                            deleteItem: props.deleteItem,
                            addToCart: props.addToCart,
                            user: props.user,
                            createOrder: props.createOrder
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Cart