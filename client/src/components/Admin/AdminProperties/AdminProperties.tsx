import {Outlet} from "react-router-dom";
import {PropsType} from "../../../types/admin/admin-properties-types";

function AdminProperties(props: PropsType) {
    return (
        <Outlet context={{
            addProperty: props.addProperty,
            properties: props.properties,
            toggleModal: props.toggleModal
        }}/>
    )
}

export default AdminProperties