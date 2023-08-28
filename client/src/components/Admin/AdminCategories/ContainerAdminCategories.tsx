import {connect} from "react-redux";
import {StoreType} from "../../../types/store/store";
import AdminCategories from "./AdminCategories";
import {addCategory, loadCategories, loadProperties, toggleModal} from "../../../store/actions/admin";
import {useEffect} from "react";
import {ContainerPropsType} from "../../../types/admin/admin-categories-types";

function ContainerAdminCategories(props: ContainerPropsType) {
    useEffect(() => {
        props.loadCategories()
        props.loadProperties()
    }, [])

    return <AdminCategories
        categories={props.categories}
        addCategory={props.addCategory}
        requiredProperties={props.requiredProperties}
        toggleModal={props.toggleModal}
    />
}

const mapStateToProps = (state: StoreType) => {
    return {
        categories: state.admin.category.categories,
        requiredProperties: state.admin.property.properties
    }
}

export default connect(mapStateToProps, {loadCategories, addCategory, loadProperties, toggleModal})(ContainerAdminCategories)