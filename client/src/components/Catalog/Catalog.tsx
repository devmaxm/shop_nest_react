import CatalogHeader from "./CatalogHeader";
import CatalogMain from "./Main/CatalogMain";
import { CatalogType, FilterValuesType} from "../../types/catalog-types";
import {CartType} from "../../types/cart-types";
import {ProfileType} from "../../types/profile-types";

type PropsType = {
    profile: ProfileType | null
    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void

    isAuth: boolean
    toggleModal: () => void

    catalog: CatalogType,

    cart: CartType
    addToCart: (productId:number, quantity: number) => void

    filterValues: FilterValuesType | null
    searchParams: any
    setSearchParams: any
}

function Catalog(props: PropsType) {
    return (
        <div className='full_screen_height'>
            <CatalogHeader catalog={props.catalog}/>
            <CatalogMain filterValues={props.filterValues} searchParams={props.searchParams}
                         setSearchParams={props.setSearchParams} catalog={props.catalog} addToCart={props.addToCart}
                         cart={props.cart} addToFavorite={props.addToFavorite} profile={props.profile}
                         removeFromFavorite={props.removeFromFavorite} isAuth={props.isAuth} toggleModal={props.toggleModal}
            />

        </div>
    )
}

export default Catalog