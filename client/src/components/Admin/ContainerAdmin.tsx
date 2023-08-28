import Admin from "./Admin";
import {UserType} from "../../types/auth-types";
import {connect} from "react-redux";
import {StoreType} from "../../types/store/store";
import Error404 from "../Errors/Error404";

function ContainerAdmin(props: { user: UserType | null}) {
    if (props.user) {
        return props.user.role === "ADMIN" ? <Admin/> : <Error404/>
    }
    return <Error404/>

}

const mapStateToPros = (state: StoreType) => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToPros, {})(ContainerAdmin)