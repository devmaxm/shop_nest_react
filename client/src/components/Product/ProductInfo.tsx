import {Grid} from "@mui/material";
import s from "./Product.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ColorDiv from "../Other/Color";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {ProductTypeWithReviews} from "../../types/product-types";
import CheckIcon from '@mui/icons-material/Check';
import {NavLink} from "react-router-dom";
import {CartType} from "../../types/cart-types";
import {ProfileType} from "../../types/profile-types";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

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

function ProductInfo(props: PropsType) {
    const inCart = props.cart.items.find(i => i.id === props.currentProduct?.id)
    const inFavorite = props.profile && props.profile.favorite.find(i => i.id === props.currentProduct?.id)

    const handleFavorite = () => {
        if (props.isAuth && props.currentProduct) {
            inFavorite ? props.removeFromFavorite(props.currentProduct.id) : props.addToFavorite(props.currentProduct.id)
        } else {
            props.toggleModal()
        }
    }

    return (
        <Grid container xl={6} md={8} xs={12} sx={{p: '30px', height: "fit-content"}}
              className={`white_bg ${s.product_info_wrapper}`}>
            {/*card header*/}
            <Grid container item sm={12} className={s.section_container}>
                <Grid item xs={6}>
                    <p className='text'>Артикул: h31H13_jJlj</p>
                </Grid>
                <Grid item xs={6} className={s.add_to_favorite}>
                    <button className={s.add_to_favorite_button} onClick={handleFavorite}>
                        {
                            inFavorite ?
                                <FavoriteOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px' className={s.add_to_favorite__active}/>
                                :
                                <FavoriteBorderOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px'/>
                        }
                    </button>
                </Grid>

            </Grid>
            {/*card color*/}
            <Grid container item xs={12} className={s.section_container}>
                <Grid item xs={6} className={s.product_color}>
                    <p className={s.colorTitle}>Цвет:</p>
                    {props.currentProduct && <ColorDiv colorHex={props.currentProduct.color.hex}/>}
                </Grid>
                <Grid item xs={6}>
                    <p className={`available_text ${s.product_available}`}>
                        <DoneOutlinedIcon/>В наличии</p>
                </Grid>
            </Grid>
            {/*card main section*/}

            <Grid item sm={12} className={s.card_main_section}>

                <Grid container className={`${s.card_main_section} ${s.price_container}`}>
                    <Grid container xs={12} className={s.product_price}>
                        {props.currentProduct &&
                            <>
                                <p className={s.price_title}>{props.currentProduct.sale > 0 ?
                                    <s className={s.old_price}>{props.currentProduct.priceUAN} грн</s> : "Цена"}</p>
                                <div className={s.price}>{props.currentProduct.sale > 0 ?
                                    Math.ceil(props.currentProduct.priceUAN - (props.currentProduct.priceUAN / 100 * props.currentProduct.sale)) :
                                    props.currentProduct.priceUAN
                                } руб
                                </div>
                            </>
                        }
                    </Grid>

                    <Grid item xs={12} className={s.add_to_cart_section} sm={12}>
                        {inCart ?
                            <NavLink to='/cart' className={`${s.cart_btn} ${s.in_cart}`}>
                                <CheckIcon/>
                                Перейти в корзину
                            </NavLink>
                            :
                            <button className={s.cart_btn} onClick={
                                () =>
                                    props.currentProduct && props.addToCart(props.currentProduct.id, 1)
                            }>
                                <ShoppingCartOutlinedIcon style={{marginRight: "10px"}}/>
                                В корзину
                            </button>
                        }

                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default ProductInfo