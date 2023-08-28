import Footer from "./Footer";
import {connect} from "react-redux";
import {StoreType} from "../../types/store/store";
import {loadFooterCategories} from "../../store/actions/footer";
import {toggleModal} from "../../store/actions/auth";
import {useEffect} from "react";
import {CategoryWithModelsType} from "../../types/product-types";

export type PropsType = {
    categories: CategoryWithModelsType[]
    toggleModal: () => void
    loadFooterCategories: () => void
    isAuth: boolean
}

function FooterContainer(props: PropsType) {
    useEffect(() => {
        props.loadFooterCategories()
    }, [])

    return <Footer categories={props.categories} toggleModal={props.toggleModal} isAuth={props.isAuth} />
}

const mapStateToProps = (state:StoreType) => {
    return {
        categories: state.footer.categories,
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {loadFooterCategories, toggleModal})(FooterContainer)