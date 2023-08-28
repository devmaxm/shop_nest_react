import AdminOrders from "./AdminOrders";
import {connect} from "react-redux";
import {useEffect} from "react";
import {StoreType} from "../../../types/store/store";
import {Order} from "../../../types/cart-types";
import {loadOrders} from "../../../store/actions/admin";

type PropsType = {
    loadOrders: () => void
    orders: Order[]
}

function ContainerAdminOrder(props: PropsType) {
    useEffect(() => {
        props.loadOrders()
    }, [])
    return <AdminOrders orders={props.orders} />
}

const mapStateToProps = (state: StoreType) => {
    return {
        orders: state.admin.order.orders
    }
}

export default connect(mapStateToProps, {loadOrders})(ContainerAdminOrder)