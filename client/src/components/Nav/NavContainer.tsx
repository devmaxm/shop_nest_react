import Nav from "./Nav";
import {connect} from "react-redux";
import {loadCategories, toggleSearch} from "../../store/actions/header";
import {StoreType} from "../../types/store/store";
import {toggleModal} from "../../store/actions/auth";
import {useEffect} from "react";
import {deleteItem} from "../../store/actions/cart";
import {CategoryWithModelsType} from "../../types/product-types";
import {CartType} from "../../types/cart-types";
import Unauthorized from "../Other/UnauthorizedModal";

export type PropsType = {
    categories: CategoryWithModelsType[] | []
    cart: CartType
    isAuth: boolean

    loadCategories: () => void
    deleteItem: (productId: number) => void
    toggleModal: () => void

    isSearchActive: boolean
    toggleSearch: () => void
}

function NavContainer(props: PropsType) {
    useEffect(() => {
        props.loadCategories()
    }, [])

    return (
        <header>
            <Unauthorized />
            <Nav
                categories={props.categories}
                cart={props.cart}
                deleteItem={props.deleteItem}
                isAuth={props.isAuth}
                toggleModal={props.toggleModal}
                isSearchActive={props.isSearchActive}
                toggleSearch={props.toggleSearch}
            />
        </header>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        categories: state.header.categories,
        isSearchActive: state.header.isSearchActive,
        cart: state.cart.cart,
        isAuth: state.auth.isAuth,
    }
}
export default connect(mapStateToProps, {loadCategories, deleteItem, toggleModal, toggleSearch})(NavContainer)