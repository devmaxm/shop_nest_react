import {PropsType} from "../../../types/admin/admin-model-types";
import {Outlet} from "react-router-dom";

function AdminModels(props: PropsType) {
    return (
        <Outlet context={{
            models: props.models,
            addModel: props.addModel,
            categories: props.categories,
            brands: props.brands
        }}/>
    )
}

export default AdminModels