import {connect} from "react-redux";
import {StoreType} from "../../../types/store/store";
import AdminProperties from "./AdminProperties";
import {ContainerPropsType} from "../../../types/admin/admin-properties-types";
import {addProperty, loadProperties, toggleModal} from "../../../store/actions/admin";
import {useEffect} from "react";

function ContainerAdminProperties(props: ContainerPropsType) {
    useEffect(() => {
        props.loadProperties()
    }, [])

    return <AdminProperties
        properties={props.properties}
        addProperty={props.addProperty}
        toggleModal={props.toggleModal}
    />
}

const mapStateToProps = (state: StoreType) => {
    return {
        properties: state.admin.property.properties
    }
}
export default connect(mapStateToProps, {addProperty, loadProperties, toggleModal})(ContainerAdminProperties)