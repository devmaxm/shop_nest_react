import {Outlet} from "react-router-dom";
import {PropsType} from "../../../types/admin/admin-categories-types";

function AdminCategories(props: PropsType) {
    return (
            <Outlet context={{
                categories: props.categories,
                addCategory: props.addCategory,
                requiredProperties: props.requiredProperties,
                toggleModal: props.toggleModal
            }}/>
    )
}

export default AdminCategories