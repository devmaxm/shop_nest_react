import {Grid} from "@mui/material";
import s from './Profile.module.css'
import ProfileNav from "./ProfileNav";
import {Outlet} from "react-router-dom";
import {ProfileType} from "../../types/profile-types";
import {CartType, Order} from "../../types/cart-types";

export type PropsType = {
    profile: ProfileType | null,
    orders: Order[] | null
    isAuth: boolean
    cart: CartType
    addToCart: (productId: number, quantity: number) => void
    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void
    logout: () => void
}

function Profile(props: PropsType) {
    return (
        <Grid container className={`${s.profile_wrapper} full_screen_height`}>
            <ProfileNav logout={props.logout} />
            <Grid item md={9} xs={12}>
                <Outlet context={{
                    profile: props.profile,
                    cart: props.cart,
                    addToCart: props.addToCart,
                    addToFavorite: props.addToFavorite,
                    removeFromFavorite: props.removeFromFavorite,
                    orders: props.orders,
                    isAuth: props.isAuth
                }} />
            </Grid>
        </Grid>
    )
}

export default Profile