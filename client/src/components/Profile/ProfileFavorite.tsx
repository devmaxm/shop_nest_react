import {Grid} from "@mui/material";
import ProductItem from "../Catalog/Main/ProductItem";
import {useOutletContext} from "react-router-dom";
import {PropsType} from "./Profile";
import s from './Profile.module.css'


function ProfileFavorite() {
    const {profile, addToCart, cart, addToFavorite, removeFromFavorite, isAuth} = useOutletContext<PropsType>()
    return <Grid container className={s.favorite_wrapper}>
        {profile?.favorite ?
            profile.favorite.map(product => <ProductItem
                key={product.id}
                product={product}
                addToCart={addToCart}
                cart={cart}
                addToFavorite={addToFavorite}
                profile={profile}
                removeFromFavorite={removeFromFavorite}
                isAuth={isAuth}
            />) :
            <p style={{color: "#898989", width: "100%", marginTop: "10px", textAlign: 'center'}}>Ничего не найдено</p>
        }
        {profile?.favorite.length === 0 && <p style={{color: "#898989", width: "100%", marginTop: "10px", textAlign: 'center'}}>Ничего не найдено</p>}
    </Grid>
}

export default ProfileFavorite
