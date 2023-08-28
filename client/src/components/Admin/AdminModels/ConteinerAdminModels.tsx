import {ContainerPropsType} from "../../../types/admin/admin-model-types";
import AdminModels from "./AdminModels";
import {connect} from "react-redux";
import {StoreType} from "../../../types/store/store";
import {addModel, loadBrands, loadCategories, loadModels} from "../../../store/actions/admin";
import {useEffect} from "react";

function ContainerAdminModels(props: ContainerPropsType) {
    useEffect(() => {
        props.loadModels()
        props.loadBrands()
        props.loadCategories()
    }, [])
    return <AdminModels
        models={props.models}
        brands={props.brands}
        categories={props.categories}
        addModel={props.addModel}
    />
}

const mapStateToProps = (state: StoreType) => {
    return {
        models: state.admin.model.models,
        brands: state.admin.brand.brands,
        categories: state.admin.category.categories
    }
}
export default connect(mapStateToProps, {addModel, loadModels, loadCategories, loadBrands})(ContainerAdminModels)