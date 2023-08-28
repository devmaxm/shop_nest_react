import {Outlet} from "react-router-dom";
import {ColorType} from "../../../types/product-types";

export type PropsType = {
    colors: ColorType[],
    addColor: (color: string, hex: string, slug: string) => void,
    toggleModal: (modalType?: string, id?: number) => void
}

function AdminColor(props: PropsType) {
    return (
        <>
            <Outlet context={{
                colors: props.colors,
                addColor: props.addColor,
                toggleModal: props.toggleModal
            }}/>
        </>
    )
}

export default AdminColor