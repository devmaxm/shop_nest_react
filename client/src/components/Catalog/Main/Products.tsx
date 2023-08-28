import {Grid} from "@mui/material";
import ProductItem from "./ProductItem";
import {CatalogType} from "../../../types/catalog-types";
import s from '../Catalog.module.css'
import {CartType} from "../../../types/cart-types";
import {ProfileType} from "../../../types/profile-types";

type PropsType = {
    isAuth: boolean
    toggleModal: () => void

    profile: ProfileType | null
    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void

    catalog: CatalogType,

    cart: CartType
    addToCart: (productId: number, quantity: number) => void

    searchParams: any
    handleSearchParam: (key: string, value: string) => void,
}

function Products(props: PropsType) {
    const handlePriceFilter = () => {
        props.searchParams.getAll('price').includes('desc') ? props.handleSearchParam('price', 'asc') : props.handleSearchParam('price', 'desc')
    }
    return (
        <Grid container sx={{
            flex: "1 1 100%",
            maxWidth: "100%",
        }}
        >
            <Grid item xs={12} className={s.catalog_header}>
                <p style={{
                    color: "#bababa",
                    fontSize: "14px",
                    fontWeight: 300,
                    marginBottom: 0,
                    textAlign: "start"
                }}
                >Сортировка
                    <span style={{cursor: "pointer", marginLeft: '5px', color: "#0a84ff"}} onClick={handlePriceFilter}>
                        За ценой
                        <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas"
                             data-icon="sort-amount-down-alt" className={s.priceSortIcon}
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d={props.searchParams.getAll('price').includes('asc') ?
                                    `M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm-64 0h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352z` :
                                    "M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.39-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.78 160 16 160z"}
                            ></path>
                        </svg>
                    </span></p>
            </Grid>
            <Grid container>
                {props.catalog.products.length !== 0 ?
                    props.catalog.products.map(product => <ProductItem
                        key={product.id}
                        product={product}
                        addToCart={props.addToCart}
                        cart={props.cart}
                        addToFavorite={props.addToFavorite}
                        profile={props.profile}
                        removeFromFavorite={props.removeFromFavorite}
                        isAuth={props.isAuth}
                        toggleModal={props.toggleModal}
                    />) :
                    <p style={{color: "#898989", width: "100%", marginTop: "10px", textAlign: 'center'}}>Ничего не
                        найдено</p>}
            </Grid>
        </Grid>
    )
}

export default Products