import s from '../Cart.module.css'
import {Grid} from "@mui/material";
import React from "react";
import OrderForm from "./OrderForm";
import {useOutletContext} from "react-router-dom";
import CartItem from "../CartDetail/CartItem";
import {PropsType} from "../Cart";

function Order() {
    const {cart, deleteItem, decrementItem, addToCart} = useOutletContext<PropsType>()
    const cartItems = cart.items.map((item) => {
        return <CartItem
            item={item}
            key={item.id}
            decrementItem={decrementItem}
            deleteItem={deleteItem}
            addToCart={addToCart}
            inOrder={true}
        />
    })
    return (
        <>
            <Grid container item md={4} xs={12}>
                <OrderForm />
            </Grid>
            <Grid item md={8} xs={12} className={`${s.cart_items_wrapper} ${s.in_order}`}>
                {cartItems}
            </Grid>
        </>
    )
}

export default Order