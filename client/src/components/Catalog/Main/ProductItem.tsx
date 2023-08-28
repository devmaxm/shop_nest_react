import {Grid} from "@mui/material";
import s from '../Catalog.module.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {ProductWithRelationsType} from "../../../types/product-types";
import {Link, NavLink} from "react-router-dom";
import {CartType} from "../../../types/cart-types";
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {ProfileType} from "../../../types/profile-types";

type PropsType = {
    profile: ProfileType | null
    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void

    isAuth?: boolean
    toggleModal?: () => void

    product: ProductWithRelationsType;

    cart: CartType
    addToCart: (productId: number, quantity: number) => void;
}

function ProductItem(props: PropsType) {
    const inCart = props.cart.items.find(i => i.id === props.product.id)
    const inFavorite = props.profile && props.profile.favorite.find(i => i.id === props.product.id)
    const img = require(`../../../../../server/files/product_photo/${props.product.photo}`)

    const handleFavorite = () => {
        if (props.isAuth) {
            inFavorite ? props.removeFromFavorite(props.product.id) : props.addToFavorite(props.product.id)
        } else {
            props.toggleModal && props.toggleModal()
        }
    }
    return (
        <Grid item xl={4} md={4} sm={6} xs={12} className={s.product_card}>
            <button
                className={s.add_to_favorite}
                onClick={handleFavorite}
            >
                {
                    inFavorite ?
                        <FavoriteOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px' className={s.add_to_favorite__active}/>
                        :
                        <FavoriteBorderOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px'/>
                }
            </button>
            {props.product.sale > 0 && <span className={s.product_on_sale}>Акция</span>}
            <Link to={`/p/${props.product.slug}`} className={s.product_card_link}>
                <div className={s.productCard_image}>
                    <img
                        src={img}
                        alt={'img'}
                        className={s.productImage}
                    />
                </div>
            </Link>
            <div className={s.productCard_description}>
                <div className={s.productInfo}>
                    <a href='' className={s.productInfo_name}>{props.product.title}</a>
                </div>
                <div className={s.product_info_bottom}>
                    {props.product.sale > 0 && <s className={s.product_red_price}>{props.product.priceUAN} руб</s>}
                    <p className={s.productPrice}>
                        {props.product.sale > 0 ?
                            Math.ceil(props.product.priceUAN - (props.product.priceUAN / 100 * props.product.sale)) :
                            props.product.priceUAN} руб
                    </p>
                    <p className={s.productAvailable}>В наличии</p>
                </div>
                <div className={s.cart_button_wrapper}>
                    {inCart ?
                        <NavLink to='/cart' className={`${s.cart_button} ${s.in_cart}`}>
                            <CheckIcon className={s.cart_icon}/>
                        </NavLink>
                        :
                        <button className={s.cart_button} onClick={() => {
                            props.addToCart(props.product.id, 1)
                        }}>
                            <ShoppingCartOutlinedIcon className={s.cart_icon}/>
                        </button>
                    }
                </div>
            </div>
        </Grid>

    )
}

export default ProductItem