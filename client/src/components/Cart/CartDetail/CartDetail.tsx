import CartItem from "./CartItem";
import React from "react";
import {useOutletContext} from "react-router-dom";
import CartItemsTotal from "./CartItemsTotal";

import {PropsType} from "../Cart";


function CartDetail() {
    const {cart, deleteItem, decrementItem, addToCart} = useOutletContext<PropsType>()
    const cartItems = cart.items.map((item) => {
        return <CartItem
            item={item}
            key={item.id}
            decrementItem={decrementItem}
            deleteItem={deleteItem}
            addToCart={addToCart}
            inOrder={false}
        />
    })
    return (
        <>
            {cartItems}
            {cartItems.length > 0 && <CartItemsTotal totalDiscountPrice={cart.totalDiscountPrice}/>}
        </>
    )
}

export default CartDetail