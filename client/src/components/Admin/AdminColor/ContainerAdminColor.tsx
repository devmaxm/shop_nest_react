import {connect} from "react-redux";
import {StoreType} from "../../../types/store/store";
import AdminColor from "./AdminColor";
import {addColor, loadColors, toggleModal} from "../../../store/actions/admin";
import {useEffect} from "react";
import {ColorType} from "../../../types/product-types";


type PropsType = {
    colors: ColorType[],
    addColor: (color: string, hex: string, slug: string) => void,
    toggleModal: (modalType?: string, id?: number) => void
    loadColors: () => void
}

function ContainerAdminColor(props: PropsType) {
    useEffect(() => {
        props.loadColors()
    }, [])

    return <AdminColor colors={props.colors} addColor={props.addColor} toggleModal={props.toggleModal}/>
}

const mapStateToProps = (state: StoreType) => {
    return {
        colors: state.admin.color.colors,
    }
}

export default connect(mapStateToProps, {loadColors, addColor, toggleModal})(ContainerAdminColor)