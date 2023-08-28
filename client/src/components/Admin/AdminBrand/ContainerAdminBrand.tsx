import {connect} from "react-redux";
import {StoreType} from "../../../types/store/store";
import {addBrand, loadBrands, toggleModal} from "../../../store/actions/admin";
import AdminBrand from "./AdminBrand";
import {ContainerPropsType} from "../../../types/admin/admin-brand-types";
import {useEffect} from "react";

function ContainerAdminBrand(props: ContainerPropsType) {
    useEffect(() => {
        props.loadBrands()
    }, [])
    return <AdminBrand brands={props.brands} addBrand={props.addBrand} toggleModal={props.toggleModal}/>
}

const mapStateToProps = (state: StoreType) => {
    return {
        brands: state.admin.brand.brands
    }
}

export default connect(mapStateToProps, {loadBrands, addBrand, toggleModal})(ContainerAdminBrand)