import s from './Product.module.css'
import {ProductTypeWithReviews} from "../../types/product-types";
import {Grid} from "@mui/material";

import ProductInfo from "./ProductInfo";
import PhotoCarousel from "./PhotoCarousel";
import ProductFooter from "./ProductFooter";
import {ProfileType} from "../../types/profile-types";
import {CartType} from "../../types/cart-types";
import UnauthorizedModal from "../Other/UnauthorizedModal";

export type PropsType = {
    isAuth: boolean
    toggleModal: () => void

    profile: ProfileType | null
    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void

    currentProduct: ProductTypeWithReviews | null
    addToCart: (productId: number, quantity: number) => void
    cart: CartType

}

function ProductDetail(props: PropsType) {
    return (
        <>
            <UnauthorizedModal />
            <Grid className='grey_bg'>
                <div style={{height: "50px"}}></div>
                <Grid container className='container'>
                    <Grid item sm={12}>
                        <h1 className={s.productTitle}>{props.currentProduct?.title}</h1>
                    </Grid>
                    {/*Product Info*/}
                    <Grid container sx={{marginBottom: "20px"}}>
                        {props.currentProduct && <PhotoCarousel photos={props.currentProduct.photos}/>}
                        <ProductInfo
                            isAuth={props.isAuth}
                            toggleModal={props.toggleModal}

                            profile={props.profile}
                            addToFavorite={props.addToFavorite}
                            removeFromFavorite={props.removeFromFavorite}

                            currentProduct={props.currentProduct}

                            addToCart={props.addToCart}
                            cart={props.cart}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {props.currentProduct && <ProductFooter description={props.currentProduct.description}
                            properties={props.currentProduct.properties} reviews={props.currentProduct.reviews}/>}
        </>
    )
}

export default ProductDetail