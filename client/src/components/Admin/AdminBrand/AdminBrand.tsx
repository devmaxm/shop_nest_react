import {Outlet} from "react-router-dom";
import {PropsType} from "../../../types/admin/admin-brand-types";

function AdminBrand(props: PropsType) {
    return (
        <Outlet context={{brands: props.brands, addBrand: props.addBrand, toggleModal: props.toggleModal}}/>
    )
}

export default AdminBrand